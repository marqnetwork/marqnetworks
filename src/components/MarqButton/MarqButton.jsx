// src/components/MarqButton.jsx
import React from "react";

const MarqButton = ({ className = "", style = {} }) => {
  const defaultStyle = {
    fontWeight: 500, 
    ...style,   
    };    
  return (
    <a
      href="https://marqnetworks.zohobookings.com/#/business-consultation"
      target="_blank"
      rel="noopener noreferrer"
    >
      <button className={className} style={defaultStyle}>
        Meet MarQ Networks
      </button>
    </a>
  );
};

export default MarqButton;
