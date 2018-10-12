var express = require('express');
var router = express.Router();

const uploadCloud = require('../configs/cloudinary.js');

var Student = require('../models/student')

router.get('/', function (req, res, next) {
  Student.find()
    .then((results) => {
      res.status(200).json(results)
    })
    .catch(next);
});

router.post('/', uploadCloud.single('file'), function(req, res, next) {
  const student = new Student({
    name: req.body.name,
    image: req.file.url
  });

  student.save((err) => {
    if (err) return res.json(err);
    return res.json({
      message: 'New Phone created!',
      student: student
    });
  });
});

module.exports = router;
