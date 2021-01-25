import React, { useEffect, useState } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import PopupLabel from '../PopupLabel/PopupLabel';
import validateForm from '../../../utils/validateForm';

function RegisterPopup({ handleRegister, isOpen, onClose, onChangeForm, registerError, isRegisterSuccess }) {

  const {
    values, handleInputChange, errors, isValid, resetForm,
  } = validateForm();

  React.useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);


  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRegister(values);
  };

  return (

    <PopupWithForm
      register={true}
      registerError={registerError}
      isRegisterSuccess={isRegisterSuccess}
      name='register'
      title='Регистрация'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
      onChangeForm={onChangeForm}
      isDisabled={!isValid}
      formButtonText='Зарегистрироваться'
    >
      <PopupLabel
        label='E-mail'
        id='email' required
        error={errors.email}
        value={values.email}
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
      <PopupLabel
        label='Имя'
        id='name' required
        error={errors.name}
        value={values.name || ''}
        name='name'
        type='text'
        placeholder='Введите своё имя'
        onChange={handleInputChange}
        noValidate
        minLength='2'
        maxLength='30'
      >
      </PopupLabel>
    </PopupWithForm>

  );

}

export default RegisterPopup;