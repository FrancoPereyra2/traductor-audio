const GROQ_ENDPOINT =
  'https://api.groq.com/openai/v1/audio/transcriptions';

const GROQ_MODEL = 'whisper-large-v3';

const GROQ_API_KEY =
  import.meta.env.VITE_GROQ_API_KEY?.trim() ?? '';

async function readGroqError(response) {
  const body = await response
    .json()
    .catch(() => ({}));

  const apiMessage = body?.error?.message;

  switch (response.status) {
    case 401:
      return 'La API key de Groq no es válida o fue revocada.';

    case 413:
      return 'El archivo supera el tamaño permitido por Groq.';

    case 429:
      return 'Se alcanzó el límite de uso de Groq. Intentá nuevamente más tarde.';

    default:
      return apiMessage ?? `Error ${response.status} al transcribir.`;
  }
}

export async function transcribeAudio(
  audioFile,
  options = {},
  onProgress = () => {},
) {
  if (!GROQ_API_KEY) {
    throw new Error(
      'Falta VITE_GROQ_API_KEY en el archivo .env. Reiniciá Vite después de agregarla.',
    );
  }

  const {
    language = 'auto',
    prompt = '',
  } = options;

  onProgress({
    step: 'Subiendo audio…',
    detail: 'Enviando el archivo a Groq',
    pct: 20,
  });

  const formData = new FormData();

  formData.append('file', audioFile, audioFile.name);
  formData.append('model', GROQ_MODEL);
  formData.append('response_format', 'verbose_json');
  formData.append('temperature', '0');

  if (language && language !== 'auto') {
    formData.append('language', language);
  }

  const cleanPrompt = prompt.trim();

  if (cleanPrompt) {
    formData.append(
      'prompt',
      cleanPrompt.slice(0, 1000),
    );
  }

  onProgress({
    step: 'Transcribiendo con máxima precisión…',
    detail: 'Modelo Whisper Large V3',
    pct: 50,
  });

  const response = await fetch(GROQ_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(
      await readGroqError(response),
    );
  }

  const data = await response.json();

  const text = String(data?.text ?? '').trim();

  if (!text) {
    throw new Error(
      'Groq no devolvió una transcripción. Revisá que el audio tenga voz audible.',
    );
  }

  onProgress({
    step: 'Transcripción lista',
    detail: '',
    pct: 75,
  });

  return {
    text,
    language: data?.language ?? '',
    duration: Number(data?.duration) || null,
  };
}