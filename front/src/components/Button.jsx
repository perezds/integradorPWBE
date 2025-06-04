import React from 'react';
import './button.module.css'; 

const Button = ({ children, variant = 'default', onClick }) => {
  return (
    <button className={`btn ${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};

export { Button };
