import React from 'react';

import './CloseButton.css';

const CloseButton = ({ onClick }) => (
  <button onClick={onClick} title='Закрыть' className='close-btn'>
  </button>
);

export default CloseButton;