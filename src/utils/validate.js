const regExpEmail = /([a-zA-Z0-9]([-_.]?[a-zA-Z0-9]+)*)@([a-zA-Z0-9]([-]?[a-zA-Z0-9]+)*)(\.([a-zA-Z])+)+/i;
const regExpPassword = /(^\S*).{8,}$/;


export default (values) => {
  const errors = {};

  const validateEmail = (value) => {
    if (regExpEmail.test(value)) {
      errors.email = false;
    } else if (!value) {
      errors.email = 'Обязательное поле';
    } else {
      errors.email = 'Введите корректный Email адрес';
    }
  };
  const validatePassword = (value) => {
    if (regExpPassword.test(value)) {
      errors.password = false;
    } else if (!value) {
      errors.password = 'Обязательное поле';
    } else {
      errors.password = 'Пароль должен быть длиной не менее 8 символов и не содержать пробелы';
    }
  };

  if (Object.prototype.hasOwnProperty.call(values, 'email')) validateEmail(values.email);
  if (Object.prototype.hasOwnProperty.call(values, 'password')) validatePassword(values.password);

  return errors;
};