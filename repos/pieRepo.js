const fs = require('fs');
let FILE_NAME = './assests/pie.json';

let pieRepo = {
  get: function (resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  },
};

module.exports = pieRepo;
