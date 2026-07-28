const TRANSLATION_ENDPOINT =
  'https://api.mymemory.translated.net/get';

const MAX_CHUNK_LENGTH = 450;

function wait(milliseconds) {
  return new Promise(resolve => {
    window.setTimeout(resolve, milliseconds);
  });
}

function splitText(text, maxLength = MAX_CHUNK_LENGTH) {
  const cleanText = text.trim();

  if (cleanText.length <= maxLength) {
    return [cleanText];
  }

  const words = cleanText.split(/\s+/);
  const chunks = [];

  let currentChunk = '';

  for (const word of words) {
    if (word.length > maxLength) {
      if (currentChunk) {
        chunks.push(currentChunk);
        currentChunk = '';
      }

      for (let index = 0; index < word.length; index += maxLength) {
        chunks.push(
          word.slice(index, index + maxLength),
        );
      }

      continue;
    }

    const candidate = currentChunk
      ? `${currentChunk} ${word}`
      : word;

    if (candidate.length > maxLength) {
      chunks.push(currentChunk);
      currentChunk = word;
    } else {
      currentChunk = candidate;
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks;
}

async function translateChunk(text, sourceLanguage) {
  const languagePair =
    `${sourceLanguage}|es`;

  const url = new URL(TRANSLATION_ENDPOINT);

  url.searchParams.set('q', text);
  url.searchParams.set('langpair', languagePair);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Error ${response.status} al traducir.`,
    );
  }

  const data = await response.json();

  if (String(data?.responseStatus) !== '200') {
    throw new Error(
      data?.responseDetails || 'No se pudo traducir el texto.',
    );
  }

  return String(
    data?.responseData?.translatedText ?? text,
  );
}

export async function translateToSpanish(
  text,
  sourceLanguage = 'unknown',
) {
  if (!text?.trim()) {
    return '';
  }

  if (sourceLanguage === 'es') {
    return text;
  }

  const language =
    sourceLanguage === 'unknown'
      ? 'autodetect'
      : sourceLanguage;

  const chunks = splitText(text);
  const translations = [];

  for (let index = 0; index < chunks.length; index += 1) {
    const chunk = chunks[index];

    try {
      const translated = await translateChunk(
        chunk,
        language,
      );

      translations.push(translated);
    } catch (error) {
      console.error(
        '[TranslationService]',
        error,
      );

      translations.push(chunk);
    }

    if (index < chunks.length - 1) {
      await wait(400);
    }
  }

  return translations.join(' ');
}