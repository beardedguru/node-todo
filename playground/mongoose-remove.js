const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// Todo.remove({}).then(result => {
//   console.log(result);
// });

// Todo.findOneAndRemove()

Todo.findOneAndRemove({ _id: '5a700d1fcd379e58e405d319' }).then(todo => {});

// Todo.findByIdAndRemove()

Todo.findByIdAndRemove('5a700d1fcd379e58e405d319').then(todo => {
  console.log(todo);
});
