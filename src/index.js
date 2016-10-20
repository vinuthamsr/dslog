var request = require('superagent');

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5
};

export default class DSLogger {
  constructor(logType, appName) {
    this.logType = logType;
    this.appName = appName;
  }

  log(logType, msg, eventType, source, attributes, callback) {
    console.log('Log this event' + this.appName);
    console.log('default was ' + levels[this.logType]);

    if (levels[logType] <= levels[this.logType]) {
      request
        .post('http://localhost:8000/dslog')
        .type('application/json')
        .accept('json')
        .send({
          logType: logType,
          msg: msg,
          eventType: 'UI_Event',
          source: this.appName
        })
        .end(function (err, res) {
          if (err) {
            return err;
          }
        });
    }
  }
}
