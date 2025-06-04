import React from 'react';
import './card.module.css'; 

const Card = ({ children, className = '' }) => {
  return <div className={`card ${className}`}>{children}</div>;
};

export { Card };