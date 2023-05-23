const mongoose = require('mongoose');
// Create a schema for the user
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true,unique:true },
  password: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: String, required: true },
  state: { type: String, required: true },
  createdate: { type: Date, default : Date.now },
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);
module.exports = User;
