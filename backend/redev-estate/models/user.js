const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  });

userSchema.methods.verifyPassword = function(password) {
  return this.password === password;
};

module.exports = mongoose.model('User', userSchema);

