export const LANGUAGE_NAMES = {
  en: 'Inglés',
  es: 'Español',
  fr: 'Francés',
  de: 'Alemán',
  it: 'Italiano',
  pt: 'Portugués',
  ru: 'Ruso',
  ja: 'Japonés',
  ko: 'Coreano',
  zh: 'Chino',
  ar: 'Árabe',
  nl: 'Holandés',
  pl: 'Polaco',
  sv: 'Sueco',
  tr: 'Turco',
  hi: 'Hindi',
};

const LANGUAGE_ALIASES = {
  english: 'en',
  spanish: 'es',
  french: 'fr',
  german: 'de',
  italian: 'it',
  portuguese: 'pt',
  russian: 'ru',
  japanese: 'ja',
  korean: 'ko',
  chinese: 'zh',
  arabic: 'ar',
  dutch: 'nl',
  polish: 'pl',
  swedish: 'sv',
  turkish: 'tr',
  hindi: 'hi',
};

const LANGUAGE_RULES = {
  en: /\b(?:the|a|an|is|are|was|were|have|and|or|but|with|for)\b/gi,
  es: /\b(?:el|la|los|las|de|en|que|es|con|para|por|una|un)\b/gi,
  fr: /\b(?:le|la|les|de|du|et|est|que|qui|pas|pour|une|un)\b/gi,
  de: /\b(?:der|die|das|und|ist|ich|ein|eine|mit|dem|den)\b/gi,
  pt: /\b(?:o|a|os|as|de|em|que|é|com|para|por|uma|um)\b/gi,
  it: /\b(?:il|la|le|di|del|e|che|è|in|con|per|una|un)\b/gi,
};

export function normalizeLanguage(value) {
  if (!value) {
    return '';
  }

  const normalized = String(value)
    .trim()
    .toLowerCase();

  if (/^[a-z]{2}$/.test(normalized)) {
    return normalized;
  }

  return LANGUAGE_ALIASES[normalized] ?? '';
}

export function detectLanguage(text) {
  if (!text?.trim()) {
    return 'unknown';
  }

  if (/[ñ¿¡]/i.test(text)) {
    return 'es';
  }

  const sample = text.slice(0, 500);

  let bestLanguage = 'unknown';
  let highestScore = 2;

  for (const [language, rule] of Object.entries(LANGUAGE_RULES)) {
    const score = sample.match(rule)?.length ?? 0;

    if (score > highestScore) {
      highestScore = score;
      bestLanguage = language;
    }
  }

  return bestLanguage;
}

export function getLanguageName(language) {
  if (!language || language === 'unknown') {
    return 'Auto-detectado';
  }

  return LANGUAGE_NAMES[language] ?? language;
}