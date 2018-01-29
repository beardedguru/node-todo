const mongoose = require('mongoose');

// Create User model
var User = mongoose.model('User', {
  text: {
    type: String,
    required: true,
    trim: true,
    min: 1,
  },
});

module.exports = { User };
