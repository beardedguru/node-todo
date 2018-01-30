const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // tells mongoose to use global promise
mongoose.connect(process.env.MONGODB_URI); // connection request to our local database

module.exports = {
  mongoose,
};
