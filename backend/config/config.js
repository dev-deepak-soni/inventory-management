const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/inventory')
  .then(() => console.log('Mongo DB Connected!'))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });