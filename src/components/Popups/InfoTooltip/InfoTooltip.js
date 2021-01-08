import React from 'react';

function InfoTooltip({
  name, isOpen, onClose, message,
}) {

   return (
    <div className={`popup popup_name_${name} ${isOpen && 'popup_opened'}`}>
      <div className='popup__container popup__container_type_popup'>
        <button type='button' className='popup__btn-close' onClick={onClose}></button>

         <p className='popup__text-info-tooltip'>{message}</p>
      </div>
    </div>
  );

}

export default InfoTooltip;
