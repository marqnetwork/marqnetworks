// src/components/MarqButton.jsx
"use client";
import React from "react";

const MarqButton = ({
  href = "https://marqnetworks.zohobookings.com/#/business-consultation",
  target = "_blank",
  rel = "noopener noreferrer",
  className = "",
  style = {},
  children = "Meet MarQ Networks",
}) => {
  const defaultStyle = {
    fontWeight: 500,
    ...style,
  };

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
      style={defaultStyle}
    >
      {children}
    </a>
  );
};

export default MarqButton;
