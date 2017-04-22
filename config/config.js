var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'labs'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/labs-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'labs'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/labs-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'labs'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/labs-production'
  }
};

module.exports = config[env];
