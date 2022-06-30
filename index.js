// run `node index.js` in the terminal
const express = require('express');
let app = express();

let router = express.Router();

let pies = [
  { id: 1, name: 'Mango' },
  { id: 2, name: 'Cherry' },
  { id: 3, name: 'Orange' },
];
router.get('/', function (req, res, next) {
  res.status(200).json({
    status: 200,
    StatusText: 'OK',
    message: 'All Ingredients Retrieved',
    data: pies,
  });
});

app.use('/api/', router);

var server = app.listen(5000, function () {
  console.log('Node server 2');
});
console.log(`Hello Node.js v${process.versions.node}!`);
