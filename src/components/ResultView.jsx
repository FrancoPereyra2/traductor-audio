import {
  CopyIcon,
  DownloadIcon,
  ResetIcon,
  SpeakerIcon,
  StopIcon,
} from "./icons";

import { useSpeech } from "../hooks/useSpeech";

function CopyButton({ copied, onClick }) {
  return (
    <button
      type="button"
      className={`btn-copy${copied ? " copied" : ""}`}
      onClick={onClick}
    >
      {copied ? (
        "✓ Copiado"
      ) : (
        <>
          <CopyIcon />
          Copiar
        </>
      )}
    </button>
  );
}

export function ResultView({
  result,
  languageName,
  copied,
  onCopy,
  onDownload,
  onReset,
}) {
  const {
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
    stop,
    toggle,
  } = useSpeech();

  return (
    <div className="section results-section">
      <div className="results-bar">
        <span className="lang-badge">Idioma detectado: {languageName}</span>

        <button type="button" className="btn-ghost" onClick={onReset}>
          <ResetIcon />
          Nueva traducción
        </button>
      </div>

      <div className="panel">
        <div className="panel-top">
          <span className="panel-title">Transcripción original</span>

          <div className="panel-actions">
{supported && (
  <div className="speech-toolbar">
    <label className="speech-field">
      <span>Idioma de la voz</span>

      <select
        value={selectedLanguage}
        onChange={event => {
          stop();
          setSelectedLanguage(
            event.target.value,
          );
        }}
      >
        {languages.map(language => (
          <option
            key={language.code}
            value={language.code}
          >
            {language.name} ({language.code})
          </option>
        ))}
      </select>
    </label>

    <label className="speech-field">
      <span>Voz</span>

      <select
        value={selectedVoiceURI}
        onChange={event => {
          stop();
          setSelectedVoiceURI(
            event.target.value,
          );
        }}
      >
        {availableVoices.map(voice => (
          <option
            key={voice.voiceURI}
            value={voice.voiceURI}
          >
            {voice.name}
          </option>
        ))}
      </select>
    </label>

    <label className="speech-field">
      <span>Velocidad</span>

      <select
        value={rate}
        onChange={event => {
          stop();
          setRate(
            Number(event.target.value),
          );
        }}
      >
        <option value={0.5}>
          Muy lenta
        </option>

        <option value={0.75}>
          Lenta
        </option>

        <option value={1}>
          Normal
        </option>

        <option value={1.5}>
          Rápida
        </option>

        <option value={2}>
          Muy rápida
        </option>
      </select>
    </label>

    <button
      type="button"
      className={`btn-speech${
        isSpeaking ? " speaking" : ""
      }`}
      onClick={() =>
        toggle(result.translated)
      }
    >
      {isSpeaking ? (
        <>
          <StopIcon />
          Detener
        </>
      ) : (
        <>
          <SpeakerIcon />
          Escuchar
        </>
      )}
    </button>
  </div>
)}

            <CopyButton
              copied={copied.original}
              onClick={() => onCopy("original")}
            />
          </div>
        </div>

        <div className="panel-text">{result.original}</div>
      </div>

      <div className="results-footer">
        <button type="button" className="btn-outline" onClick={onDownload}>
          <DownloadIcon />
          Descargar resultado (.txt)
        </button>
      </div>
    </div>
  );
}
