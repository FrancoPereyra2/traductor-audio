import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const MAX_CHUNK_LENGTH = 220;

function splitText(text) {
  const words = text.trim().split(/\s+/);
  const chunks = [];

  let current = "";

  for (const word of words) {
    const candidate = current
      ? `${current} ${word}`
      : word;

    if (
      candidate.length > MAX_CHUNK_LENGTH &&
      current
    ) {
      chunks.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }

  if (current) {
    chunks.push(current);
  }

  return chunks;
}

function getVoiceScore(voice) {
  const name = voice.name?.toLowerCase() ?? "";

  let score = 0;

  if (/natural|neural/.test(name)) {
    score += 50;
  }

  if (/google|microsoft/.test(name)) {
    score += 30;
  }

  if (voice.default) {
    score += 10;
  }

  if (voice.localService) {
    score += 5;
  }

  return score;
}

function selectBestVoice(voices) {
  return [...voices].sort(
    (voiceA, voiceB) =>
      getVoiceScore(voiceB) -
      getVoiceScore(voiceA),
  )[0] ?? null;
}

function getLanguageLabel(code) {
  try {
    const displayNames = new Intl.DisplayNames(
      ["es"],
      { type: "language" },
    );

    return displayNames.of(code) ?? code;
  } catch {
    return code;
  }
}

export function useSpeech() {
  const supported =
    typeof window !== "undefined" &&
    "speechSynthesis" in window &&
    "SpeechSynthesisUtterance" in window;

  const [voices, setVoices] = useState([]);
  const [selectedLanguage, setSelectedLanguage] =
    useState("");

  const [selectedVoiceURI, setSelectedVoiceURI] =
    useState("");

  const [rate, setRate] = useState(1);
  const [isSpeaking, setIsSpeaking] =
    useState(false);

  const chunksRef = useRef([]);
  const chunkIndexRef = useRef(0);
  const executionRef = useRef(0);

  useEffect(() => {
    if (!supported) {
      return undefined;
    }

    const synthesis = window.speechSynthesis;

    function loadVoices() {
      const availableVoices =
        synthesis.getVoices();

      setVoices(availableVoices);

      setSelectedLanguage(currentLanguage => {
        const currentExists =
          availableVoices.some(
            voice =>
              voice.lang.toLowerCase() ===
              currentLanguage.toLowerCase(),
          );

        if (currentLanguage && currentExists) {
          return currentLanguage;
        }

        const spanishVoices =
          availableVoices.filter(voice =>
            voice.lang
              ?.toLowerCase()
              .startsWith("es"),
          );

        const bestVoice = selectBestVoice(
          spanishVoices.length
            ? spanishVoices
            : availableVoices,
        );

        return bestVoice?.lang ?? "es-AR";
      });
    }

    loadVoices();

    synthesis.addEventListener(
      "voiceschanged",
      loadVoices,
    );

    return () => {
      executionRef.current += 1;
      synthesis.cancel();

      synthesis.removeEventListener(
        "voiceschanged",
        loadVoices,
      );
    };
  }, [supported]);

  const languages = useMemo(() => {
    const uniqueLanguages = [
      ...new Set(
        voices
          .map(voice => voice.lang)
          .filter(Boolean),
      ),
    ];

    return uniqueLanguages
      .sort((a, b) => a.localeCompare(b))
      .map(code => ({
        code,
        name: getLanguageLabel(code),
      }));
  }, [voices]);

  const availableVoices = useMemo(() => {
    return voices.filter(
      voice =>
        voice.lang.toLowerCase() ===
        selectedLanguage.toLowerCase(),
    );
  }, [voices, selectedLanguage]);

  useEffect(() => {
    setSelectedVoiceURI(currentVoiceURI => {
      const currentExists =
        availableVoices.some(
          voice =>
            voice.voiceURI === currentVoiceURI,
        );

      if (currentVoiceURI && currentExists) {
        return currentVoiceURI;
      }

      return (
        selectBestVoice(availableVoices)
          ?.voiceURI ?? ""
      );
    });
  }, [availableVoices]);

  const stop = useCallback(() => {
    if (!supported) {
      return;
    }

    executionRef.current += 1;

    window.speechSynthesis.cancel();

    chunksRef.current = [];
    chunkIndexRef.current = 0;

    setIsSpeaking(false);
  }, [supported]);

  const speak = useCallback(
    text => {
      if (!supported || !text?.trim()) {
        return;
      }

      window.speechSynthesis.cancel();

      executionRef.current += 1;

      const executionId =
        executionRef.current;

      chunksRef.current = splitText(text);
      chunkIndexRef.current = 0;

      const selectedVoice = voices.find(
        voice =>
          voice.voiceURI === selectedVoiceURI,
      );

      setIsSpeaking(true);

      function speakNextChunk() {
        if (
          executionId !== executionRef.current
        ) {
          return;
        }

        const chunk =
          chunksRef.current[
            chunkIndexRef.current
          ];

        if (!chunk) {
          setIsSpeaking(false);
          return;
        }

        const utterance =
          new SpeechSynthesisUtterance(chunk);

        if (selectedVoice) {
          utterance.voice = selectedVoice;
          utterance.lang = selectedVoice.lang;
        } else {
          utterance.lang =
            selectedLanguage || "es-AR";
        }

        utterance.rate = rate;
        utterance.pitch = 1;
        utterance.volume = 1;

        utterance.onend = () => {
          if (
            executionId !==
            executionRef.current
          ) {
            return;
          }

          chunkIndexRef.current += 1;
          speakNextChunk();
        };

        utterance.onerror = event => {
          if (
            event.error !== "canceled" &&
            event.error !== "interrupted"
          ) {
            console.error(
              "[SpeechSynthesis]",
              event.error,
            );
          }

          setIsSpeaking(false);
        };

        window.speechSynthesis.speak(
          utterance,
        );
      }

      window.setTimeout(speakNextChunk, 0);
    },
    [
      supported,
      voices,
      selectedVoiceURI,
      selectedLanguage,
      rate,
    ],
  );

  const toggle = useCallback(
    text => {
      if (isSpeaking) {
        stop();
      } else {
        speak(text);
      }
    },
    [isSpeaking, speak, stop],
  );

  return {
    supported,

    languages,
    selectedLanguage,
    setSelectedLanguage,

    availableVoices,
    selectedVoiceURI,
    setSelectedVoiceURI,

    rate,
    setRate,

    isSpeaking,
    speak,
    stop,
    toggle,
  };
}