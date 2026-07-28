const AUDIO_EXTENSIONS = new Set([
  'mp3',
  'wav',
  'ogg',
  'm4a',
  'flac',
  'webm',
  'aac',
  'mpeg',
  'mp4',
]);

export function formatFileSize(bytes = 0) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 ** 2) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
}

export function isAudioFile(file) {
  if (!file) {
    return false;
  }

  if (file.type?.startsWith('audio/')) {
    return true;
  }

  const extension = file.name
    .split('.')
    .pop()
    ?.toLowerCase();

  return AUDIO_EXTENSIONS.has(extension);
}

export async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');

  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';

  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
}

export function downloadTranscription({ original, translated }) {
  const content = [
    'TRANSCRIPCIÓN ORIGINAL',
    '='.repeat(50),
    original,
    '',
    'TRADUCCIÓN AL ESPAÑOL',
    '='.repeat(50),
    translated,
  ].join('\n');

  const blob = new Blob(
    [content],
    { type: 'text/plain;charset=utf-8' },
  );

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = `audiotranslate_${Date.now()}.txt`;

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}