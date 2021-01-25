import React, { useEffect, useState } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import PopupLabel from '../PopupLabel/PopupLabel';
import validateForm from '../../../utils/validateForm';

function LoginPopup({ handleLogin, isOpen, onClose, onChangeForm, actionError, isActionSuccess }) {

  const {
    values, handleInputChange, errors, isValid, resetForm,
  } = validateForm();

  React.useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleLogin(values);
  };

  return (

    <PopupWithForm
      login={true}
      actionError={actionError}
      isActionSuccess={isActionSuccess}
      name='login'
      title='Вход'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
      onChangeForm={onChangeForm}
      isDisabled={!isValid}
      formButtonText='Войти'
    >
      <PopupLabel
        label='E-mail'
        id='email' required
        error={errors.email}
        value={values.email || ''}
        name='email'
        type='email'
        placeholder='Введите почту'
        onChange={handleInputChange}
        noValidate
      >
      </PopupLabel>
      <PopupLabel
        label='Пароль'
        id='email' required
        error={errors.password}
        value={values.password || ''}
        name='password'
        type='password'
        placeholder='Введите пароль'
        onChange={handleInputChange}
        noValidate
        minLength='8'
        maxLength='30'
      >
      </PopupLabel>
    </PopupWithForm>

  );
}

export default LoginPopup;

