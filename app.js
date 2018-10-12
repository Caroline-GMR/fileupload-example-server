const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;

const api = require('./routes/api');

const app = express();

mongoose.connect('mongodb://localhost/fileupload', {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  credentials: true,
  origin: ['http://localhost:4200']
}));

app.use('/api', api);

app.use((req, res, next) => {
  res.status(404);
  res.render('not-found');
});

app.use((err, req, res, next) => {
  console.error('ERROR', req.method, req.path, err);

  if (!res.headersSent) {
    res.status(500);
    res.render('error');
  }
});

module.exports = app;
