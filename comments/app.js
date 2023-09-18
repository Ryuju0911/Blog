const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const Comment = require('./models/comment');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/posts/:id/comments', async (req, res) => {
  const { content } = req.body;

  const comment = new Comment({ postId: req.params.id, content, status: 'pending' });
  await comment.save();

  await axios.post('http://event-bus-srv:4005/events', {
    type: 'CommentCreated',
    data: comment,
  });

  res.status(201).send(comment);
});

app.post('/events', async (req, res) => {
  console.log('Event Received', req.body.type);

  const { type, data } = req.body;

  if (type === 'CommentModerated') {
    const { commentId, status } = data;

    const comment = await Comment.findById(commentId);

    comment.status = status;
    await comment.save();

    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentUpdated',
      data: comment,
    });
  }

  if (type === 'PostDeleted') {
    const postId = data;

    try {
      await Comment.deleteMany({ postId: postId });
    } catch (err) {}
  }

  res.send({});
});

module.exports = app;
