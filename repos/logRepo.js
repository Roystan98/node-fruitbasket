let fs = require('fs');
const { logErrorToConsole } = require('../helpers/errorHelpers');

let FILE_NAME = './logs/log.txt';

let logRepo = {
  write: function (data, resolve, reject) {
    let toWrite = '*'.repeat(80) + '\r\n';
    toWrite += 'Date/time: ' + new Date().toLocaleDateString() + '\r\n';
    toWrite += 'Exception info: ' + JSON.stringify(data) + '\r\n';
    toWrite += '*'.repeat(80) + '\r\n';

    fs.writeFile(FILE_NAME, toWrite, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  },
};

module.exports = logRepo;
