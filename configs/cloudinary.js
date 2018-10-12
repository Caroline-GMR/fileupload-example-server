'use strict';

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
const bcrypt = require('bcrypt');
const saltRounds = 10;

cloudinary.config({
  cloud_name: "dup8s3epo",
  api_key: "378144278151278",
  api_secret: "G4uUOhq-zf9MGS6lXATC-zTeb2s"
});

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'switcheroo',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, bcrypt.hashSync(`${Math.floor(Math.random() * 300000)}`, saltRounds));
  }
});

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;
