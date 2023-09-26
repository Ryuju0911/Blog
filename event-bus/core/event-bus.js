const axios = require('axios');

class EventBus {

  constructor() {
    this.receiversByEventType = {};
    this.eventLog = [];
    this.untreatedEvents = [];
  }

  subscribe(eventType, receiver) {
    if (!this.receiversByEventType[eventType]) {
      this.receiversByEventType[eventType] = [];
    }
    this.receiversByEventType[eventType].push(receiver);
  }

  publish(event) {
    if (!this.receiversByEventType[event.type]) {
      console.error('Unknown event: ', event.type);
      return;
    }

    this.eventLog.push(event);

    this.receiversByEventType[event.type].forEach(receiver => {
      axios.post(receiver, event).catch((err) => {
        console.log(err.message);
        this.untreatedEvents.push(event);
      });
    });
  }
}

module.exports = EventBus;
