const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PostWithComments = require('./models/post-with-comments');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const handleEvent = async (type, data) => {
  if (type === 'PostCreated') {
    const { postId, title } = data;

    const post = new PostWithComments({ postId, title, comments: [] });
    await post.save();
  }

  if (type === 'PostDeleted') {
    const postId = data;

    try {
      await PostWithComments.findOneAndDelete({ postId: postId });
    } catch (err) {};
  }

  if (type === 'PostEdited') {
    const { postId, title } = data;

    const post = await PostWithComments.findOne({ postId: postId });
    post.title = title;
    await post.save();
  }

  if (type === 'CommentCreated') {
    const { commentId, postId, content, status } = data;

    const newComment = { commentId, content, status };

    const post = await PostWithComments.findOne({ postId: postId });
    post.comments.push(newComment);
    await post.save();
  }

  if (type === 'CommentUpdated') {
    const { commentId, postId, content, status } = data;

    const post = await PostWithComments.findOne({ postId: postId });
    const comment = post.comments.find(comment => {
      return comment.commentId === commentId;
    });

    comment.status = status;
    comment.content = content;
    await post.save();
  }
}

app.get('/posts', async(req, res) => {
  allPosts = await PostWithComments.find({})

  res.send(allPosts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);
  
  res.send({});
});

module.exports = { app, handleEvent };
