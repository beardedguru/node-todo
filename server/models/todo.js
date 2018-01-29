const mongoose = require('mongoose');

// create model
var Todo = mongoose.model('Todo', {
  text: {
    type: String, // declare the type value to string
    required: true, // require input
    minlength: 1, // set min length to 1
    trim: true, // trims white space
  },
  completed: {
    type: Boolean, // declare type to true/false
    default: false, // declare default is set to false
  },
  completedAt: {
    type: Number, // declare type to number
    default: null, // set default to null
  },
});

module.exports = { Todo };
