const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// Array of NG words.
// Moderation process rejects comments containing any of the NG words.
const ngWords = ['NG'];

const handleEvent = async (type, data) => {
  
  if (type === 'CommentCreated') {
    let status = 'approved';
    for (i in ngWords) {
      if (data.content.includes(ngWords[i])) {
        status = 'rejected';
        break;
      }
    }
    
    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentModerated',
      data: {
        commentId: data.commentId,
        postId: data.postId,
        status,
        content: data.content,
      }
    });
  }
}

app.post('/events', async (req, res) => {
  console.log('Event Received', req.body.type);
  
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});

module.exports = { app, handleEvent };
