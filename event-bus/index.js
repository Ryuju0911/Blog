const express = require('express');
const bodyParser = require('body-parser');

const EventBus = require('./core/event-bus');

const app = express();
app.use(bodyParser.json());

const eventBus = new EventBus();

// PostCreated
eventBus.subscribe('PostCreated', 'http://query-srv:4002/events');

// PostEdited
eventBus.subscribe('PostEdited', 'http://query-srv:4002/events');

// PostDeleted
eventBus.subscribe('PostDeleted', 'http://comments-srv:4001/events');
eventBus.subscribe('PostDeleted', 'http://query-srv:4002/events');

// CommentCreated
eventBus.subscribe('CommentCreated', 'http://moderation-srv:4003/events');
eventBus.subscribe('CommentCreated', 'http://query-srv:4002/events');

// CommentModerated
eventBus.subscribe('CommentModerated', 'http://comments-srv:4001/events');
eventBus.subscribe('CommentModerated', 'http://query-srv:4002/events');

// CommentUpdated
eventBus.subscribe('CommentUpdated', 'http://comments-srv:4001/events');
eventBus.subscribe('CommentUpdated', 'http://query-srv:4002/events');

app.post('/events', (req, res) => {
  const event = req.body;
  eventBus.publish(event);
  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(eventBus.untreatedEvents);
});

app.listen(4005, () => {
  console.log('Listening on 4005');
});
