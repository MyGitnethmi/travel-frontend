const passport = require('passport');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('User');

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, (username, password, done) => {

  User.findOne({username}).then(user => {

    if (!user) {
      done(null, false, {errors: {username: 'is invalid'}});
    }

    user.validPassword(password).then(valid => {

      if (!valid) {
        done(null, false, {errors: {password: 'is invalid'}});
      }

      return done(null, user);

    }).catch(error => {
      return done(null, false, {errors: {'server-error': 'error occurred while retrieving data'}});
    });

  });

}));
