import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import FormatSelectionPage from './components/FormatSelectionPage';
import Toast from './components/Toast';
import { convertImage, downloadFile } from './utils/imageConverter';

function App() {
  const [images, setImages] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState('png');
  const [isConverting, setIsConverting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [imageFormats, setImageFormats] = useState([]);

  const handleImageDrop = (newImages) => {
    setImages((prevImages) => [...prevImages, ...newImages]);

    // Extract and track formats from the images
    const formats = newImages.map(img => img.format || '').filter(Boolean);
    setImageFormats((prevFormats) => {
      // Create a new array with unique formats
      const allFormats = [...prevFormats, ...formats];
      return [...new Set(allFormats)];
    });
  };

  const handleRemoveImage = (index) => {
    if (index === 'all') {
      // Clear all images
      setImages([]);
      // Clear all formats
      setImageFormats([]);
      // Show info toast
      setToast({ show: true, message: 'All images cleared', type: 'info' });
    } else {
      // Get the format of the image being removed
      const removedFormat = images[index]?.format;

      // Remove a specific image by index
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));

      // Update formats if needed
      if (removedFormat) {
        // Check if this was the last image with this format
        const remainingWithSameFormat = images.filter((img, i) =>
          i !== index && img.format === removedFormat
        );

        if (remainingWithSameFormat.length === 0) {
          // Remove this format from the tracked formats
          setImageFormats(prevFormats =>
            prevFormats.filter(format => format !== removedFormat)
          );
        }
      }
    }
  };

  const handleFormatChange = (format) => {
    setSelectedFormat(format);
  };

  const handleConversion = async () => {
    if (images.length === 0) return;

    setIsConverting(true);
    try {
      // Convert each image
      for (const image of images) {
        const convertedImage = await convertImage(image, selectedFormat);
        downloadFile(convertedImage);
      }

      // Show success toast
      const successMessage = `Successfully converted ${images.length} ${images.length === 1 ? 'image' : 'images'} to ${selectedFormat.toUpperCase()}`;
      setToast({ show: true, message: successMessage, type: 'success' });

      // Clear the images and formats to reset the page
      setImages([]);
      setImageFormats([]);
    } catch (error) {
      console.error('Error during conversion:', error);
      // Show error toast instead of alert
      setToast({ show: true, message: 'Error during conversion. Please try again.', type: 'error' });
    } finally {
      setIsConverting(false);
    }
  };

  // Function to close the toast
  const handleCloseToast = () => {
    setToast({ ...toast, show: false });
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>WebP Converter</h1>
          <p>Convert images to and from WebP format</p>
        </header>

        <main className="App-main">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  images={images}
                  selectedFormat={selectedFormat}
                  isConverting={isConverting}
                  onImageDrop={handleImageDrop}
                  onRemoveImage={handleRemoveImage}
                  onFormatChange={handleFormatChange}
                  onConversion={handleConversion}
                  imageFormats={imageFormats}
                />
              }
            />
            <Route
              path="/format-selection"
              element={
                <FormatSelectionPage
                  onFormatSelect={handleFormatChange}
                />
              }
            />
          </Routes>
        </main>

        <footer className="App-footer">
          <p>Drag and drop your images, select the output format, and convert!</p>
        </footer>

        {/* Toast notification */}
        {toast.show && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={handleCloseToast}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
