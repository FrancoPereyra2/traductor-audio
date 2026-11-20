# 🎧 Traductor de Audio · Audio Translator

> 🇦🇷 Aplicación web que transcribe archivos de audio en cualquier idioma y los traduce al español.
> 🇬🇧 Web app that transcribes audio files in any language and translates them into Spanish.

![React](https://img.shields.io/badge/React_19-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Whisper](https://img.shields.io/badge/Whisper_large--v3-Groq-F55036?style=flat)

---

## 🇦🇷 Español

### ¿Qué hace?

1. Subís un archivo de audio (arrastrando y soltando o desde el selector).
2. El audio se transcribe con **Whisper large-v3** a través de la API de **Groq**.
3. Se detecta el idioma original del audio.
4. El texto se traduce al español con la API de **MyMemory** (dividiendo textos largos en fragmentos).
5. Podés **copiar** o **descargar** la transcripción original y la traducción, y **escuchar** el resultado con síntesis de voz del navegador (Web Speech API), eligiendo automáticamente la voz más natural disponible.

### Aspectos técnicos

- Manejo de estado con `useReducer` y una máquina de fases: `upload → file → processing → result / error`.
- Custom hooks: `useAudioTranslate` (flujo completo) y `useSpeech` (lectura en voz alta por fragmentos).
- Capa de servicios separada (`groqService`, `translationService`) con manejo de errores específico (API key inválida, archivo demasiado grande, límite de uso).
- Barra de progreso por etapa durante el procesamiento.
- Componentes por vista: `UploadView`, `FileView`, `ProcessingView`, `ResultView`, `ErrorView`.

### Cómo correrlo

```bash
git clone https://github.com/FrancoPereyra2/traductor-audio.git
cd traductor-audio
npm install
```

Crear un archivo `.env` en la raíz:

```env
VITE_GROQ_API_KEY=tu_api_key_de_groq
```

```bash
npm run dev
```

---

## 🇬🇧 English

### What it does

1. Upload an audio file (drag & drop or file picker).
2. The audio is transcribed with **Whisper large-v3** through the **Groq** API.
3. The source language is detected.
4. The text is translated into Spanish with the **MyMemory** API (long texts are split into chunks).
5. You can **copy** or **download** both the original transcription and the translation, and **listen** to the result using the browser's speech synthesis (Web Speech API), which automatically picks the most natural voice available.

### Technical highlights

- State managed with `useReducer` as a phase machine: `upload → file → processing → result / error`.
- Custom hooks: `useAudioTranslate` (full flow) and `useSpeech` (chunked text-to-speech).
- Separate service layer (`groqService`, `translationService`) with specific error handling (invalid API key, file too large, rate limits).
- Step-by-step progress bar while processing.
- One component per view: `UploadView`, `FileView`, `ProcessingView`, `ResultView`, `ErrorView`.

### Getting started

```bash
git clone https://github.com/FrancoPereyra2/traductor-audio.git
cd traductor-audio
npm install
```

Create a `.env` file in the project root:

```env
VITE_GROQ_API_KEY=your_groq_api_key
```

```bash
npm run dev
```

---

👨‍💻 **Franco Pereyra** · [GitHub](https://github.com/FrancoPereyra2)
