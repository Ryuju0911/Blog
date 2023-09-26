const axios = require('axios');

const { app, handleEvent } = require('./app');

app.listen(4003, async () => {
  console.log('Listening on 4003');

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
