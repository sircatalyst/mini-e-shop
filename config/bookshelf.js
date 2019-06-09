// import environment
const environment = "development";

// import connections credentials
const config = require('../knexfile');

//variable with connection and environment credentials
const environmentConfig = config[environment];

// import knex
const knex = require('knex');

// connect connection credentials with knex
const connection = knex(environmentConfig);

// connect knex with bookshelf
var bookshelf = require('bookshelf')(connection);

module.exports = bookshelf;