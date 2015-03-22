'use strict';

// Load modules

var Lab = require('lab');
var Hapi = require('hapi');

// Declare internals

var internals = {};


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var it = lab.test;
var expect = require('code').expect;

describe('Registration', function() {

  it('should register', function(done) {

    var server = new Hapi.Server().connection({ host: 'test' });

    server.register(require('../'), function() {

      var plugin = server.plugins['hapi-mongoose-q'];
      expect(plugin).to.exist();
      expect(plugin.mongoose).to.exist();
      expect(plugin.startDb).to.exist();
      expect(plugin.stopDb).to.exist();
      plugin.stopDb();

      done();
    });
  });

  it('should register with options', function(done) {

    var server = new Hapi.Server().connection({ host: 'test' });

    server.register({
      register: require('../'),
      options: {
        mongoDbUri: 'mongodb://localhost:27017/database'
      }
    }, function(err) {

      expect(err).to.not.exist();

      var plugin = server.plugins['hapi-mongoose-q'];
      expect(plugin).to.exist();
      expect(plugin.mongoose).to.exist();
      expect(plugin.startDb).to.exist();
      expect(plugin.stopDb).to.exist();
      plugin.stopDb();

      done();
    });
  });

  it('should fail to register with bad options', function (done) {

    var server = new Hapi.Server().connection({ host: 'test' });

    server.register({
      register: require('../'),
      options: {
        foo: 'bar'
      }
    }, function(err) {

      expect(err).to.exist();
      expect(err.message).to.equal('"foo" is not allowed');
      done();
    });
  });
});

describe('Connection', function() {

  it('should fail to connect with a malformed connection URI', function (done) {

    var server = new Hapi.Server().connection({ host: 'test' });

    server.register({
      register: require('../'),
      options: {
        mongoDbUri: 'mongodb:/localhost'
      }
    }, function(err) {

      expect(err).to.exist();
      expect(err.message).to.equal('failed to connect to [mongodb:27017]');
      done();
    });
  });
});
