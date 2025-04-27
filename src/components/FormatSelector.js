import React from 'react';
import './FormatSelector.css';

const FormatSelector = ({ selectedFormat, onFormatChange }) => {
  const formats = [
    { value: 'jpeg', label: 'JPEG' },
    { value: 'png', label: 'PNG' },
    { value: 'gif', label: 'GIF' },
    { value: 'webp', label: 'WebP' }
  ];

  return (
    <div className="format-selector">
      <label htmlFor="format-select">Convert to:</label>
      <select 
        id="format-select" 
        value={selectedFormat} 
        onChange={(e) => onFormatChange(e.target.value)}
      >
        {formats.map((format) => (
          <option key={format.value} value={format.value}>
            {format.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormatSelector;
