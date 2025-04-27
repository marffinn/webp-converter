import imageCompression from 'browser-image-compression';

// Get the correct MIME type for the format
const getMimeType = (format) => {
  const mimeTypes = {
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'png': 'image/png',
    'webp': 'image/webp',
    'gif': 'image/gif',
    'bmp': 'image/bmp',
    'tiff': 'image/tiff',
    'ico': 'image/x-icon',
    'avif': 'image/avif'
  };

  return mimeTypes[format] || `image/${format}`;
};

// Convert image to the specified format
export const convertImage = async (imageFile, targetFormat) => {
  try {
    // Get the correct MIME type
    const mimeType = getMimeType(targetFormat);

    // Create a new File object with the desired MIME type
    const options = {
      maxSizeMB: 10,
      useWebWorker: true,
      fileType: mimeType,
    };

    // Compress and convert the image
    const convertedFile = await imageCompression(imageFile, options);

    // Create a new file with the correct extension
    const fileName = imageFile.name.split('.').slice(0, -1).join('.');
    const newFileName = `${fileName}.${targetFormat}`;

    return new File([convertedFile], newFileName, {
      type: mimeType,
    });
  } catch (error) {
    console.error('Error converting image:', error);
    throw error;
  }
};

// Download a file
export const downloadFile = (file) => {
  const url = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
