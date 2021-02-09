import React from 'react';

import Overlay from '../Popups/Overlay/Overlay';

import './Preloader.css';

function Preloader({ isOpen }) {

  return (
    <Overlay isOpen={isOpen}>

      <div className='preloader__container'>
        <div className='preloader__circle'></div>
        <p className='preloader__title'>Ищем новости...</p>
      </div>
    </Overlay>
  );
}

export default Preloader;