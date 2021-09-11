const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {type: String, required: [true, 'cannot be blank'], unique: true},
  password: {type: String, required: [true, 'cannot be blank']}
});

mongoose.model('User', UserSchema);
