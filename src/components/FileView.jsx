import {
  CloseIcon,
  MicIcon,
  SparkleIcon,
} from './icons';

import {
  formatFileSize,
} from '../utils/file';

export function FileView({
  file,
  onRemove,
  onProcess,
}) {
  return (
    <div className="section">
      <div className="file-card">
        <div className="file-icon-wrap">
          <MicIcon />
        </div>

        <div className="file-meta">
          <p className="file-name">
            {file.name}
          </p>

          <p className="file-size">
            {formatFileSize(file.size)}
          </p>
        </div>

        <button
          type="button"
          className="btn-icon"
          title="Quitar archivo"
          aria-label="Quitar archivo"
          onClick={onRemove}
        >
          <CloseIcon />
        </button>
      </div>

      <button
        type="button"
        className="btn-primary"
        onClick={onProcess}
      >
        <SparkleIcon />
        Transcribir con máxima precisión y traducir
      </button>
    </div>
  );
}