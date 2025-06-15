import React, { useRef } from 'react';
import styles from '../../styles/ExportImport.module.scss';

export default function ExportImport({ clicker }) {
  const fileInputRef = useRef();

  // Trigger download of current game state as JSON file
  function handleExport() {
    const dataStr = clicker.exportState();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `duikt-clicker-save-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Read selected file and import its contents
  function handleImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        clicker.importState(parsed);
        alert('Game state imported successfully!');
      } catch {
        alert('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
    // reset input so same file can be re-selected later
    e.target.value = '';
  }

  return (
    <div className={styles.container}>
      <h2>⚙️ Export / Import</h2>
      <button onClick={handleExport}>Export Save as JSON</button>
      <div className={styles.importRow}>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          onChange={handleImport}
        />
      </div>
    </div>
  );
}
