import React from 'react';

import Overlay from '../Overlay/Overlay';
import Modal from '../Modal/Modal';
import { CloseButton } from '../../Buttons/index';

import './InfoTooltip.css';

function InfoTooltip({
  isOpen, onClose, canAuth, message,
}) {

  return (

    <Overlay isOpen={isOpen}>
      <Modal isOpen={isOpen}>
        <CloseButton title="Закрыть" onClick={onClose} />

        <p className='info-tooltip__text'>{message}</p>
        {canAuth && <p className='info-tooltip__link-text' onClick={onChangeForm}>Войти</p>}
      </Modal>
    </Overlay>
  );

}

export default InfoTooltip;
