'use strict';

// Load modules

var Hoek = require('hoek');
var Joi = require('joi');
var mongoose = require('mongoose-q')();

// Declare internals

var internals = {
  defaults: {
    mongoDbUri: 'mongodb://localhost'
  },
  options: Joi.object({
    mongoDbUri: Joi.string()
  })
};


exports.register = function (server, options, next) {

  var validateOptions = internals.options.validate(options);
  if (validateOptions.error) {
      return next(validateOptions.error);
  }

  var settings = Hoek.clone(internals.defaults);
  Hoek.merge(settings, options);

  var startDb = function (callback) {

    server.log(['plugin', 'info'], 'Mongoose connecting to ' + settings.mongoDbUri);
    mongoose.connect(settings.mongoDbUri, function (err) {

      if (err) {
        server.log(['plugin', 'error'], 'Mongoose connection failure');
        return callback(err);
      }

      server.log(['plugin', 'info'], 'Mongoose connected to ' + settings.mongoDbUri);
      callback();
    });
  };

  var stopDb = function () {

    mongoose.disconnect();
  };

  // Expose mongoose, startDb and stopDb
  server.expose('mongoose', mongoose);
  server.expose('startDb', startDb);
  server.expose('stopDb', stopDb);

  // Start mongoDB connection
  startDb(next);
};

exports.register.attributes = {
  pkg: require('../package.json')
};
