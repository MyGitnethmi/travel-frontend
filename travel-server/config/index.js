module.exports = {
  secret: 'secret',
  databaseURI: 'mongodb+srv://vishwa:Intelh61m@travel-database.a94mt.mongodb.net/travel?retryWrites=true&w=majority',
  passwordValidator: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/,
  phoneValidator: /^((\+94)|0)?\d{9}$/
}
