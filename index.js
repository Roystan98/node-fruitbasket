// run `node index.js` in the terminal
const express = require('express');
let pieRepo = require('./repos/pieRepo');
let app = express();

let router = express.Router();

app.use(express.json()); // for passing data

// get all fruits from Basket
router.get('/', function (req, res, next) {
  pieRepo.get(
    function (data) {
      res.status(200).json({
        status: 200,
        StatusText: 'OK',
        message: 'All Fruits Retrieved',
        data: data,
      });
    },
    function (err) {
      next(err);
    }
  );
});

// search the basket query
router.get('/search', function (req, res, next) {
  let searchObject = {
    id: req.query.id,
    name: req.query.name,
  };

  pieRepo.search(
    searchObject,
    function (data) {
      res.status(200).json({
        status: 200,
        StatusText: 'OK',
        message: 'Searched Fruits Retrieved',
        data: data,
      });
    },
    function (err) {
      next(err);
    }
  );
});

// get the fruit by Id
router.get('/:id', function (req, res, next) {
  pieRepo.getById(
    req.params.id,
    function (data) {
      if (data) {
        res.status(200).json({
          status: 200,
          StatusText: 'OK',
          message: 'Single Fruit by ID Retrieved',
          data: data,
        });
      } else {
        res.status(404).json({
          status: 404,
          StatusText: 'Not Found',
          message: 'Fruit by ID ' + req.params.id + ' not Found in the basket',
          error: {
            code: 'Not found',
            message:
              'Fruit by ID ' + req.params.id + ' not Found in the basket',
          },
        });
      }
    },
    function (err) {
      next(err);
    }
  );
});

// New data POST Function
router.post('/', function (req, res, next) {
  pieRepo.insert(
    req.body,
    function (data) {
      res.status(201).json({
        status: 201,
        StatusText: 'Created',
        message: 'New Fruit Added to the Basket',
        data: data,
      });
    },
    function (err) {
      next(err);
    }
  );
});

// Update data function(for patch and put)
router.put('/:id', function (req, res, next) {
  pieRepo.getById(
    req.params.id,
    function (data) {
      if (data) {
        pieRepo.update(req.body, req.params.id, function (data) {
          res.status(200).json({
            status: 200,
            StatusText: 'Updated',
            message:
              'Fruit with id ' + req.params.id + ' updated in the Basket',
            data: data,
          });
        });
      } else {
        res.status(404).json({
          status: 404,
          StatusText: 'Not Found',
          message: 'Fruit by ID ' + req.params.id + ' not Found in the basket',
          error: {
            code: 'Not found',
            message:
              'Fruit by ID ' + req.params.id + ' not Found in the basket',
          },
        });
      }
    },
    function (err) {
      next(err);
    }
  );
});

router.patch('/:id', function (req, res, next) {
  pieRepo.getById(
    req.params.id,
    function (data) {
      if (data) {
        pieRepo.update(req.body, req.params.id, function (data) {
          res.status(200).json({
            status: 200,
            StatusText: 'Updated',
            message:
              'Fruit with id ' + req.params.id + ' updated in the Basket',
            data: data,
          });
        });
      } else {
        res.status(404).json({
          status: 404,
          StatusText: 'Not Found',
          message: 'Fruit by ID ' + req.params.id + ' not Found in the basket',
          error: {
            code: 'Not found',
            message:
              'Fruit by ID ' + req.params.id + ' not Found in the basket',
          },
        });
      }
    },
    function (err) {
      next(err);
    }
  );
});

// delete function
router.delete('/:id', function (req, res, next) {
  pieRepo.getById(
    req.params.id,
    function (data) {
      if (data) {
        res.status(204).json({
          status: 204,
          StatusText: 'Deleted',
          message: 'Fruit with ' + req.params.id + ' is Deleted',
        });
      } else {
        res.status(404).json({
          status: 404,
          statusText: 'Not Found',
          message: 'Fruit with id ' + req.params.id + ' not found',
        });
      }
    },
    function (err) {
      next(err);
    }
  );
});

app.use('/api/', router);

var server = app.listen(5000, function () {
  console.log('Node server 2');
});
console.log(`Hello Node.js v${process.versions.node}!`);
