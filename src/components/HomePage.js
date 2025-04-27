import React from 'react';
import { useNavigate } from 'react-router-dom';
import ImageDropzone from './ImageDropzone';
import FormatButtons from './FormatButtons';
import ImagePreview from './ImagePreview';
import ConversionButton from './ConversionButton';
import './HomePage.css';

const HomePage = ({
  images,
  selectedFormat,
  isConverting,
  onImageDrop,
  onRemoveImage,
  onFormatChange,
  onConversion,
  imageFormats
}) => {
  const navigate = useNavigate();

  // Function to clear all images
  const handleClearAll = () => {
    if (images.length > 0) {
      // No confirmation dialog - just clear the images
      onRemoveImage('all');
    }
  };

  return (
    <div className="home-page">
      <ImageDropzone onImageDrop={onImageDrop} />

      {images.length > 0 && (
        <>
          <div className="format-selection-container">
            <div className="format-selection-left">
              <FormatButtons
                selectedFormat={selectedFormat}
                onFormatChange={onFormatChange}
                excludeFormats={imageFormats}
              />
            </div>
            <button
              className="clear-all-btn"
              onClick={handleClearAll}
              title="Clear all images"
            >
              Clear All
            </button>
          </div>

          <ImagePreview
            images={images}
            onRemoveImage={onRemoveImage}
          />

          <div className="action-buttons">
            <ConversionButton
              onClick={onConversion}
              isConverting={isConverting}
              disabled={images.length === 0}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
