import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FormatSelectionPage.css';

const FormatSelectionPage = ({ onFormatSelect }) => {
  const navigate = useNavigate();

  const formats = [
    {
      id: 'jpeg',
      name: 'JPEG',
      description: 'Best for photographs and complex images with many colors.',
      advantages: 'Smaller file size, widely supported',
      disadvantages: 'Lossy compression, no transparency'
    },
    {
      id: 'png',
      name: 'PNG',
      description: 'Best for images with transparency and sharp details.',
      advantages: 'Lossless compression, transparency support',
      disadvantages: 'Larger file size than JPEG'
    },
    {
      id: 'webp',
      name: 'WebP',
      description: 'Modern format with excellent compression and quality.',
      advantages: 'Smaller than JPEG with similar quality, supports transparency',
      disadvantages: 'Not supported by all older browsers'
    },
    {
      id: 'gif',
      name: 'GIF',
      description: 'Best for simple animations and images with few colors.',
      advantages: 'Animation support, widely compatible',
      disadvantages: 'Limited to 256 colors, larger file size for complex images'
    },
    {
      id: 'bmp',
      name: 'BMP',
      description: 'Uncompressed bitmap image format.',
      advantages: 'No compression artifacts, widely supported',
      disadvantages: 'Very large file sizes'
    },
    {
      id: 'tiff',
      name: 'TIFF',
      description: 'High-quality format used in photography and printing.',
      advantages: 'High quality, supports layers and multiple pages',
      disadvantages: 'Large file size, less web support'
    },
    {
      id: 'ico',
      name: 'ICO',
      description: 'Icon format used for website favicons and Windows icons.',
      advantages: 'Can contain multiple sizes in one file',
      disadvantages: 'Limited use cases, primarily for icons'
    },
    {
      id: 'avif',
      name: 'AVIF',
      description: 'Next-generation image format with excellent compression.',
      advantages: 'Better compression than WebP, high quality',
      disadvantages: 'Limited browser support, newer format'
    }
  ];

  const handleFormatSelect = (formatId) => {
    onFormatSelect(formatId);
    navigate('/');
  };

  return (
    <div className="format-selection-page">
      <h2>Select Output Format</h2>
      <p className="format-selection-intro">
        Choose the format that best suits your needs. Different formats have different advantages.
      </p>

      <div className="format-grid">
        {formats.map((format) => (
          <div
            key={format.id}
            className="format-card"
            onClick={() => handleFormatSelect(format.id)}
          >
            <div className="format-header">
              <h3>{format.name}</h3>
              <div className="format-icon">.{format.id}</div>
            </div>

            <p className="format-description">{format.description}</p>

            <div className="format-details">
              <div className="format-pros">
                <h4>Advantages</h4>
                <p>{format.advantages}</p>
              </div>
              <div className="format-cons">
                <h4>Disadvantages</h4>
                <p>{format.disadvantages}</p>
              </div>
            </div>

            <button className="select-format-btn">
              Select {format.name}
            </button>
          </div>
        ))}
      </div>

      <button
        className="back-button"
        onClick={() => navigate('/')}
      >
        Back to Converter
      </button>
    </div>
  );
};

export default FormatSelectionPage;
