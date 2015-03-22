# Hapi-Mongoose-Q

[**Mongoose-Q**](https://github.com/iolo/mongoose-q) connector for [**hapi**](https://github.com/hapijs/hapi)

## Description

This plugin provides the functionality to **connect and disconnect from a mongoDB database** using mongoose-q. It also **ensures that the connection is available** before calling `server.start()`.

## Usage

```javascript
var Hapi = require('hapi');
var server = new Hapi.Server();

server.connection({ port: 3000 });

server.register({
  register: require('hapi-mongoose-q'),
  options: {
    mongoDbUri: 'mongodb://localhost'
  }
}, function(err) {
  if (err) {
    console.error(err);
    throw err;
  }
});

server.start();
```

## Options

The following option must be passed when registering the plugin:
- _'mongoDbUri'_ - a string representing the connection URI used to connect to a MongoDB database server.

