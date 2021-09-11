const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {type: String, required: [true, 'cannot be blank'], unique: true},
  password: {type: String, required: [true, 'cannot be blank']},
  phone: {type: String, required: [true, 'cannot be blank'], maxlength: 12, minlength: 10}
});

mongoose.model('User', UserSchema);
