import React from 'react';

import './Overlay.css';

const Overlay = ({ isOpen, onClick, children }) => {
  const overlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClick();
    }
  };

  return (
    <div className={`overlay overlay_visible_${isOpen}`} onClick={overlayClick}>{children}</div>
  );
};

export default Overlay;