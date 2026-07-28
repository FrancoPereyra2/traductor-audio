import {
  useReducer,
  useRef,
} from 'react';

import {
  transcribeAudio,
} from '../services/groqService';

import {
  translateToSpanish,
} from '../services/translationService';

import {
  detectLanguage,
  getLanguageName,
  normalizeLanguage,
} from '../utils/language';

import {
  copyText,
  downloadTranscription,
  isAudioFile,
} from '../utils/file';

function createInitialState() {
  return {
    phase: 'upload',
    file: null,

    progress: {
      step: '',
      detail: '',
      pct: 0,
    },

    result: {
      original: '',
      translated: '',
      language: '',
    },

    isDragging: false,

    copied: {
      original: false,
      translated: false,
    },

    error: '',
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'FILE_SELECTED':
      return {
        ...state,
        file: action.file,
        phase: 'file',
        error: '',
      };

    case 'PROCESS_STARTED':
      return {
        ...state,
        phase: 'processing',
        progress: {
          step: 'Iniciando…',
          detail: '',
          pct: 0,
        },
      };

    case 'PROGRESS_UPDATED':
      return {
        ...state,
        progress: action.progress,
      };

    case 'PROCESS_COMPLETED':
      return {
        ...state,
        phase: 'result',
        result: action.result,
      };

    case 'ERROR_OCCURRED':
      return {
        ...state,
        phase: 'error',
        error: action.message,
      };

    case 'DRAGGING_CHANGED':
      return {
        ...state,
        isDragging: action.value,
      };

    case 'COPY_CHANGED':
      return {
        ...state,
        copied: {
          ...state.copied,
          [action.target]: action.value,
        },
      };

    case 'RESET':
      return createInitialState();

    default:
      return state;
  }
}

export function useAudioTranslate() {
  const [state, dispatch] = useReducer(
    reducer,
    undefined,
    createInitialState,
  );

  const fileInputRef = useRef(null);

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  function selectFile(file) {
    if (!file) {
      return;
    }

    if (!isAudioFile(file)) {
      dispatch({
        type: 'ERROR_OCCURRED',
        message:
          'Seleccioná un archivo de audio válido: MP3, WAV, OGG, M4A, FLAC o WEBM.',
      });

      return;
    }

    dispatch({
      type: 'FILE_SELECTED',
      file,
    });
  }

  async function processFile() {
    if (!state.file) {
      return;
    }

    dispatch({
      type: 'PROCESS_STARTED',
    });

    try {
      const transcription = await transcribeAudio(
        state.file,
        {
          language: 'auto',
          prompt: '',
        },
        progress => {
          dispatch({
            type: 'PROGRESS_UPDATED',
            progress,
          });
        },
      );

      const original = transcription.text;

      const language =
        normalizeLanguage(transcription.language)
        || detectLanguage(original);

      dispatch({
        type: 'PROGRESS_UPDATED',
        progress: {
          step: 'Traduciendo al español…',
          detail: 'Consultando API de traducción',
          pct: 82,
        },
      });

      const translated = await translateToSpanish(
        original,
        language,
      );

      dispatch({
        type: 'PROGRESS_UPDATED',
        progress: {
          step: '¡Completado!',
          detail: '',
          pct: 100,
        },
      });

      dispatch({
        type: 'PROCESS_COMPLETED',
        result: {
          original,
          translated,
          language,
        },
      });
    } catch (error) {
      console.error(
        '[AudioTranslate]',
        error,
      );

      dispatch({
        type: 'ERROR_OCCURRED',
        message:
          error instanceof Error
            ? error.message
            : String(error),
      });
    }
  }

  function reset() {
    dispatch({
      type: 'RESET',
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  async function copyResult(target) {
    const text =
      target === 'original'
        ? state.result.original
        : state.result.translated;

    try {
      await copyText(text);

      dispatch({
        type: 'COPY_CHANGED',
        target,
        value: true,
      });

      window.setTimeout(() => {
        dispatch({
          type: 'COPY_CHANGED',
          target,
          value: false,
        });
      }, 2000);
    } catch (error) {
      console.error(
        '[CopyResult]',
        error,
      );
    }
  }

  function saveResult() {
    downloadTranscription(
      state.result,
    );
  }

  function handleDragOver(event) {
    event.preventDefault();

    dispatch({
      type: 'DRAGGING_CHANGED',
      value: true,
    });
  }

  function handleDragLeave(event) {
    event.preventDefault();

    dispatch({
      type: 'DRAGGING_CHANGED',
      value: false,
    });
  }

  function handleDrop(event) {
    event.preventDefault();

    dispatch({
      type: 'DRAGGING_CHANGED',
      value: false,
    });

    selectFile(
      event.dataTransfer.files[0],
    );
  }

  return {
    ...state,

    languageName:
      getLanguageName(state.result.language),

    fileInputRef,

    openFilePicker,
    selectFile,
    processFile,
    reset,
    copyResult,
    saveResult,

    dragHandlers: {
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
    },
  };
}