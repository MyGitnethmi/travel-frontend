export const environment = {
  production: true,
  passwordValidator: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/,
  phoneValidator: /^((\+94)|0)?\d{9}$/,
  api: 'http://localhost:3000/api',
};
