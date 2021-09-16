const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const sharp = require('sharp');
const uniqueValidator = require('mongoose-unique-validator');

const secret = require('../config/index').secret;

const UserSchema = new mongoose.Schema({
  username: {type: String, required: [true, 'cannot be blank'], unique: true, validate: /\S+@\S+\.\S+/},
  auth: {
    method: {type: String, required: [true, 'cannot be blank'], validate: /^(password)|(google)$/},
    hash: {type: String}
  },
  firstName: {type: String, required: [true, 'cannot be blank']},
  lastName: {type: String, required: [true, 'cannot be blank']},
  phone: {type: String, validate: /^((\+94)|0)?\d{9}$/},
  avatar: {
    thumbnail: {type: String},
    original: {type: String}
  }
}, {timestamps: true});

UserSchema.index({username: 1}, {unique: true});

UserSchema.plugin(uniqueValidator, {message: 'is already taken'});

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compare(password, this.auth.hash);
}

UserSchema.methods.setPassword = function (password) {
  bcrypt.hash(password, 10).then(hash => {
    this.auth.method = 'normal';
    this.auth.hash = hash;
  });
}

UserSchema.methods.generateJWT = function () {
  const timestamp = +new Date();
  return jwt.sign({
    id: this._id,
    username: this.username,
    timestamp
  }, secret);
}

UserSchema.methods.toAuthJSON = function () {
  return {
    username: this.username,
    firstName: this.firstName,
    lastName: this.lastName,
    token: this.generateJWT(),
    avatar: this.avatar.thumbnail
  }
}

UserSchema.methods.setAvatar = function (base64Image) {

  return new Promise((resolve, reject) => {

    this.avatar.original = base64Image;

    let parts = base64Image.split(';');
    let mimType = parts[0].split(':')[1];
    let imageData = parts[1].split(',')[1];

    let img = new Buffer.from(imageData, 'base64');

    sharp(img).resize(64, 64).toBuffer().then(resizedImageBuffer => {
      let resizedImageData = resizedImageBuffer.toString('base64');
      this.avatar.thumbnail = `data:${mimType};base64,${resizedImageData}`;
      resolve();
    }).catch(error => {
      reject(error);
    });


  });

}


mongoose.model('User', UserSchema);
