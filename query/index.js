const axios = require('axios');
const mongoose = require('mongoose');

const { app, handleEvent } = require('./app');

const start = async () => {
  try {
    mongoose.connect('mongodb://query-mongo-srv:27017/posts-with-comments');
  } catch (err) {
    console.error(err);
  }

  app.listen(4002, async () => {
    console.log('Listening on 4002');
  
    try {
      const res = await axios.get('http://event-bus-srv:4005/events');
  
      for (let event of res.data) {
        console.log('Processing event: ', event.type);
  
        handleEvent(event.type, event.data);
      }
    } catch(error) {
      console.log(error.message);
    }
  });
}

start();
