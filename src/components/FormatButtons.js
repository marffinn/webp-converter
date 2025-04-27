import React from 'react';
import './FormatButtons.css';

const FormatButtons = ({ selectedFormat, onFormatChange, excludeFormats = [] }) => {
  const formats = [
    { id: 'jpeg', label: 'JPEG' },
    { id: 'png', label: 'PNG' },
    { id: 'webp', label: 'WebP' },
    { id: 'gif', label: 'GIF' },
    { id: 'bmp', label: 'BMP' },
    { id: 'tiff', label: 'TIFF' },
    { id: 'ico', label: 'ICO' },
    { id: 'avif', label: 'AVIF' }
  ];

  return (
    <div className="format-buttons">
      <div className="format-buttons-label">Format:</div>
      <div className="format-buttons-container">
        {formats
          .filter(format => !excludeFormats.includes(format.id))
          .map((format) => (
            <button
              key={format.id}
              className={`format-button ${selectedFormat === format.id ? 'active' : ''}`}
              onClick={() => onFormatChange(format.id)}
            >
              {format.label}
            </button>
          ))
        }
        {formats.filter(format => !excludeFormats.includes(format.id)).length === 0 && (
          <div className="no-formats-message">
            All formats match your images. Try a different image format.
          </div>
        )}
      </div>
    </div>
  );
};

export default FormatButtons;
