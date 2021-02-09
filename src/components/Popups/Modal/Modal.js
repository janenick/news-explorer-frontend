import React from 'react';

import './Modal.css';

const Modal = ({ isOpen, children }) => (
  <div className={`modal modal_visible_${isOpen}`}>{children}</div>
);

export default Modal;