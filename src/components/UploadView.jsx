import {
  UploadIcon,
} from './icons';

const FORMATS = [
  'MP3',
  'WAV',
  'OGG',
  'M4A',
  'FLAC',
  'WEBM',
];

export function UploadView({
  isDragging,
  inputRef,
  onOpenPicker,
  onSelectFile,
  dragHandlers,
}) {
  function handleKeyDown(event) {
    if (
      event.key === 'Enter'
      || event.key === ' '
    ) {
      event.preventDefault();
      onOpenPicker();
    }
  }

  return (
    <div className="section">
      <div
        className={`upload-zone${isDragging ? ' drag-over' : ''}`}
        role="button"
        tabIndex={0}
        aria-label="Subir archivo de audio"
        onClick={onOpenPicker}
        onKeyDown={handleKeyDown}
        {...dragHandlers}
      >
        <div className="upload-icon-wrap">
          <UploadIcon />
        </div>

        <h2 className="upload-title">
          Arrastrá tu audio aquí
        </h2>

        <p className="upload-hint">
          o hacé clic para seleccionar un archivo
        </p>

        <div className="format-row">
          {FORMATS.map(format => (
            <span
              key={format}
              className="fmt-chip"
            >
              {format}
            </span>
          ))}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="audio/*"
          hidden
          onChange={event => {
            onSelectFile(
              event.target.files[0],
            );
          }}
        />
      </div>
    </div>
  );
}