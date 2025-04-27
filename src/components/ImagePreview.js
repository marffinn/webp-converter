import React from 'react';
import './ImagePreview.css';

const ImagePreview = ({ images, onRemoveImage }) => {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="image-preview-container">
      <h3>Selected Images</h3>
      <div className="image-preview-grid">
        {images.map((image, index) => (
          <div key={index} className="image-preview-item">
            <div className="image-preview-wrapper">
              <img 
                src={URL.createObjectURL(image)} 
                alt={`Preview ${index}`} 
                className="image-preview"
              />
              <button 
                className="remove-image-btn" 
                onClick={() => onRemoveImage(index)}
              >
                ×
              </button>
            </div>
            <div className="image-info">
              <p className="image-name">{image.name}</p>
              <p className="image-size">{(image.size / 1024).toFixed(1)} KB</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagePreview;
