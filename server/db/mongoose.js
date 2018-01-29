const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // tells mongoose to use global promise
mongoose.connect('mongodb://localhost:27017/TodoApp'); // connection request to our local database

module.exports = {
  mongoose,
};
