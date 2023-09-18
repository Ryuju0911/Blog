const mongoose = require('mongoose');

const app = require('./app');

const start = async () => {
  try {
    mongoose.connect('mongodb://comments-mongo-srv:27017/comments')
  } catch (err) {
    console.error(err);
  }

  app.listen(4001, () => {
    console.log('Listening on 4001');
  });
}

start();
