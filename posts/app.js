const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const Post = require('./models/post');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/posts/create', async (req, res) => {
  const { title } = req.body;

  const post = new Post({ title });
  await post.save()
  
  await axios.post('http://event-bus-srv:4005/events', {
    type: 'PostCreated',
    data: post,
  });

  res.status(201).send(post);
});

app.post('/posts/:id/delete', async (req, res) => {

  try {
    await Post.deleteOne({ _id: req.params.id });
  } catch (err) {};

  await axios.post('http://event-bus-srv:4005/events', {
    type: 'PostDeleted',
    data: req.params.id,
  });

  res.status(201).send({});
});

app.post('/posts/:id/edit', async (req, res) => {
  const { title }  = req.body;

  const post = await Post.findOne({ _id: req.params.id });
  post.title = title;
  await post.save();

  await axios.post('http://event-bus-srv:4005/events', {
    type: 'PostEdited',
    data: post
  });

  res.status(201).send(post);
})

app.post('/events', async (req, res) => {
  console.log('Event Received', req.body.type);

  if (type === 'PostDeleted') {
    const postId = data;

    try {
      await Post.findOneAndDelete({ postId: postId });
    } catch (err) {};
  }

  if (type === 'PostEdited') {
    const { postId, title } = data;

    const post = await Post.findOne({ postId: postId });
    post.title = title;
    await post.save();
  }

  res.send({});
});

module.exports = app;
