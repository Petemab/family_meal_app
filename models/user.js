const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.Promise = require('bluebird');


const userSchema = new mongoose.Schema({
  username: { type: String, required: true , unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  user: [{type: mongoose.Schema.ObjectId, ref: 'User'}]
});

//compares hashed password with the one that's been entered
userSchema.methods.validatePassword = function validatePassword(password){
  return bcrypt.compareSync(password, this.password);
};
// don't store the password
userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
    // console.log(passwordConfirmation);
  });

// check password is ok
userSchema.pre('validate', function checkPassword(next) {
  if(this.isModified('password') && this._passwordConfirmation !== this.password){
    this.invalidate('passwordConfirmation', 'does not match');
    // console.log('this.password');
  }
  next();
});


userSchema.pre('save', function HashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
