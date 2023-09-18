const mongoose = require('mongoose');

const app = require('./app');

const start = async () => {
  try {
    await mongoose.connect('mongodb://posts-mongo-srv:27017/posts');
  } catch (err) {
    console.error(err);
  }

  app.listen(4000, () => {
    console.log('Listening on 4000');
  });
}

start();
