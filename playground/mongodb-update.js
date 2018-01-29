// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db
  //   .collection('Todos')
  //   .findOneAndUpdate(
  //     {
  //       _id: new ObjectID('5a6f8c5bcd379e58e405d318'),
  //     },
  //     {
  //       $set: {
  //         completed: true,
  //       },
  //     },
  //     {
  //       returnOriginal: false,
  //     }
  //   )
  //   .then(res => {
  //     console.log(res);
  //   });

  db
    .collection('Users')
    .findOneAndUpdate(
      {
        _id: new ObjectID('5a6e7fa1d4aa501d542b992a'),
      },
      {
        $set: {
          name: 'Charles',
        },
        $inc: {
          age: 1,
        },
      },
      {
        returnOriginal: false,
      }
    )
    .then(res => {
      console.log(res);
    });
  // db.close();
});
