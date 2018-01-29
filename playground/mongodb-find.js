// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db
  //   .collection('Todos')
  //   .find({
  //     _id: new ObjectID('5a6f72b0cd379e58e405d30a'),
  //   })
  //   .toArray()
  //   .then(
  //     docs => {
  //       console.log('Todos');
  //       console.log(JSON.stringify(docs, undefined, 2));
  //     },
  //     err => {
  //       console.log('Unable to fetch todos', err);
  //     }
  //   );

  db
    .collection('Users')
    .find({ name: 'Charles' })
    .toArray()
    .then(
      res => {
        console.log(`Users count: ${res.length}`);
        console.log(JSON.stringify(res, undefined, 2));
      },
      err => {
        console.log('Unable to fetch Todos', err);
      }
    );

  // db
  //   .collection('Todos')
  //   .find()
  //   .count()
  //   .then(
  //     count => {
  //       console.log(`Todos count: ${count}`);
  //     },
  //     err => {
  //       console.log('Unable to fetch todos', err);
  //     }
  //   );

  // db.close();
});
