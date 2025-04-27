import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './ImageDropzone.css';

const ImageDropzone = ({ onImageDrop }) => {
  const onDrop = useCallback((acceptedFiles) => {
    // Filter for image files
    const imageFiles = acceptedFiles.filter(file =>
      file.type.startsWith('image/')
    );

    if (imageFiles.length > 0) {
      // Extract format information from each file
      const filesWithFormat = imageFiles.map(file => {
        // Get format from file extension
        const extension = file.name.split('.').pop().toLowerCase();

        // Get format from MIME type as fallback
        let format = extension;
        if (file.type === 'image/jpeg') format = 'jpeg';
        else if (file.type === 'image/png') format = 'png';
        else if (file.type === 'image/webp') format = 'webp';
        else if (file.type === 'image/gif') format = 'gif';
        else if (file.type === 'image/bmp') format = 'bmp';
        else if (file.type === 'image/tiff') format = 'tiff';
        else if (file.type === 'image/x-icon') format = 'ico';
        else if (file.type === 'image/avif') format = 'avif';

        // Add format property to file object
        return Object.assign(file, { format });
      });

      onImageDrop(filesWithFormat);
    }
  }, [onImageDrop]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.webp', '.jpg', '.jpeg', '.png', '.gif']
    }
  });

  return (
    <div
      {...getRootProps()}
      className={`dropzone ${isDragActive ? 'active' : ''}`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the images here...</p>
      ) : (
        <div className="dropzone-content">
          <p>Drag & drop images here, or click to select files</p>
          <p className="dropzone-hint">Supports WebP, JPG, PNG, and GIF</p>
        </div>
      )}
    </div>
  );
};

export default ImageDropzone;
