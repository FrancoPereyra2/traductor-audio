import "./App.css";
import { ErrorView } from "./components/ErrorView";
import { FileView } from "./components/FileView";
import { LogoIcon } from "./components/icons";
import { ProcessingView } from "./components/ProcessingView";
import { ResultView } from "./components/ResultView";
import { UploadView } from "./components/UploadView";
import { useAudioTranslate } from "./hooks/useAudioTranslate";

function App() {
  const audio = useAudioTranslate();

  function renderView() {
    switch (audio.phase) {
      case "file":
        return (
          <FileView
            file={audio.file}
            onRemove={audio.reset}
            onProcess={audio.processFile}
          />
        );

      case "processing":
        return <ProcessingView progress={audio.progress} />;

      case "result":
        return (
          <ResultView
            result={audio.result}
            languageName={audio.languageName}
            copied={audio.copied}
            onCopy={audio.copyResult}
            onDownload={audio.saveResult}
            onReset={audio.reset}
          />
        );

      case "error":
        return <ErrorView message={audio.error} onReset={audio.reset} />;

      case "upload":
      default:
        return (
          <UploadView
            isDragging={audio.isDragging}
            inputRef={audio.fileInputRef}
            onOpenPicker={audio.openFilePicker}
            onSelectFile={audio.selectFile}
            dragHandlers={audio.dragHandlers}
          />
        );
    }
  }

  return (
    <div className="app">
      <div className="orbs" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <div className="shell">
        <header className="header">
          <div className="logo-wrap">
            <LogoIcon />
          </div>

          <div>
            <h1 className="brand">AudioTranslate</h1>

            <p className="tagline">
              Transcripción y traducción con IA · Groq Whisper · Instantáneo
            </p>
          </div>
        </header>

        <main>{renderView()}</main>
      </div>
    </div>
  );
}

export default App;
