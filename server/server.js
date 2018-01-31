require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb'); // used for ObjectID.isValid(id)
const _ = require('lodash');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text,
  });

  todo
    .save()
    .then(doc => {
      res.send(doc);
    })
    .catch(e => {
      res.status(400).send(e);
    });
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
  // is id valid
  if (!ObjectID.isValid(id)) {
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

// DEL /todos/:id
app.delete('/todos/:id', (req, res) => {
  // get the id
  var id = req.params.id;
  // validate the id -> not valid? return 404
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  }
  // remove todo by id
  Todo.findByIdAndRemove(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }
      res.status(200).send({ todo });
    })
    .catch(e => {
      res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }

      res.send({ todo });
    })
    .catch(e => {
      res.status(400).send();
    });
});

// POST /users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user
    .save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then(token => {
      res.header('x-auth', token).send(user);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

// POST /users/login {email, password}
app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password)
    .then(user => {
      return user.generateAuthToken().then(token => {
        res.header('x-auth', token).send(user);
      });
    })
    .catch(e => {
      res.status(400).send();
    });
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = { app };
