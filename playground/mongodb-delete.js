// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

const dbCollection = 'Todos';

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // TODOS API Calls

  // deleteMany
  // db
  //   .collection(dbCollection)
  //   .deleteMany({ text: 'Eat lunch' }) // target the criteria to be deleted
  //   .then(
  //     res => {
  //       db // query the database collection again to print remaining documents
  //         .collection(dbCollection)
  //         .find()
  //         .toArray()
  //         .then(res => {
  //           console.log(JSON.stringify(res, undefined, 2)); // Print to screen remaining documents
  //         });
  //     },
  //     err => {
  //       console.log('Unable to delete Todos');
  //     }
  //   );

  // deleteOne
  // db
  //   .collection(dbCollection)
  //   .deleteOne({ text: 'Eat lunch' })
  //   .then(
  //     res => {
  //       db // query the database collection again to print remaining documents
  //         .collection(dbCollection)
  //         .find()
  //         .toArray()
  //         .then(res => {
  //           console.log(JSON.stringify(res, undefined, 2)); // Print to screen remaining documents
  //         });
  //     },
  //     err => {
  //       console.log('Unable to find Todo');
  //     }
  //   );

  // findOneAndDelete
  // db
  //   .collection(dbCollection)
  //   .findOneAndDelete({ completed: false })
  //   .then(
  //     res => {
  //       console.log(res);
  //     },
  //     err => {
  //       console.log('Unable to find Todo');
  //     }
  //   );

  // USERS API CALLS

  // db
  //   .collection('Users')
  //   .deleteMany({ name: 'Charles' })
  //   .then(
  //     res => {
  //       console.log(res);
  //     },
  //     err => {
  //       console.log('Unable to find User');
  //     }
  //   );

  db
    .collection('Users')
    .findOneAndDelete({
      _id: new ObjectID('5a6e80f2277c135d5088fea0'),
    })
    .then(
      res => {
        console.log(res);
      },
      err => {
        console.log('Unable to find User');
      }
    );

  // db.close();
});
