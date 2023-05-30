const mongoose = require('mongoose');
// Create a schema for the user
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: false },
  email: { type: String, required: true,unique:true },
  password: { type: String, required: false },
  city: { type: String, required: false },
  zip: { type: String, required: false },
  state: { type: String, required: false },
  picture: { type: String, required: false },
  email_verified: { type: String, required: false },
  createdate: { type: Date, default : Date.now },
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);
module.exports = User;
