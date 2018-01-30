const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// var id = '5a6ff62c744fa963c466d79211';

// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }

// Todo.find({
//   _id: id,
// }).then(todos => {
//   console.log('Todos', todos);
// });

// Todo.findOne({
//   _id: id,
// }).then(todo => {
//   console.log('Todo', todo);
// });

// Todo.findById(id)
//   .then(todo => {
//     if (!todo) {
//       return console.log('Id not found');
//     }
//     console.log('Todo by ID', todo);
//   })
//   .catch(e => console.log(e));

var id = '5a6fa138bd8a6c698449ed9c';

// User.findById
User.findById(id)
  .then(user => {
    if (!user) {
      return console.log('User not found');
    }
    console.log('User by ID', user);
  })
  .catch(e => console.log(e));
