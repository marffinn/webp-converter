import React from 'react';
import './ConversionButton.css';

const ConversionButton = ({ onClick, isConverting, disabled }) => {
  return (
    <button 
      className="conversion-button" 
      onClick={onClick} 
      disabled={disabled || isConverting}
    >
      {isConverting ? 'Converting...' : 'Convert Images'}
    </button>
  );
};

export default ConversionButton;
