const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb'); // used for ObjectID.isValid(id)

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text,
  });

  todo.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get('/todos', (req, res) => {
  Todo.find().then(
    todos => {
      res.send({ todos });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

// GET /todos/1234324
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    // is id valid
    // verify that the id is valid
    res.status(404).send(); //   respond with 404 - send back empty body
  }

  // findById
  Todo.findById(id).then(
    // take the todo found
    todo => {
      // verify if its valid
      if (!todo) {
        // if not return with a status of 404 and send back empty body
        return res.status(404).send();
      }
      // success send back the todo
      res.send({ todo });
    },
    // if error send back 400 and empty body
    e => res.status(400).send()
  );
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = { app };
