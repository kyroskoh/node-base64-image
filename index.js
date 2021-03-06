'use strict';

var request = require('request');
var fs = require('fs');

var base64encoder = function (url, options, callback) {
  options = options || {};

  if (typeof callback !== 'function') {
    throw new Error('Callback needs to be a function!');
  }

  if (url === undefined || url === null) {
    throw new Error('URL cannot be empty!');
  }

  request({url: url, encoding: null}, function (err, res, body) {
    if (err) { return callback(err); }

    if (body && res.statusCode === 200) {
      var image;

      if (options && options.string === true) {
        image = body.toString('base64');
        return callback(null, image);
      } else {
        image = new Buffer(body, 'base64');
        return callback(null, image);
      }
    }
  });
};

var base64decoder = function (imageBuffer, options, callback) {
  options = options || {};

  if (options && options.filename) {
    fs.writeFile(options.filename + '.jpg', imageBuffer, 'base64', function (err) {
      if (err) { return callback(err); }
      return callback(null, 'Image saved successfully to disk!');
    });
  }
};

module.exports = {
  base64encoder: base64encoder,
  base64decoder: base64decoder
};