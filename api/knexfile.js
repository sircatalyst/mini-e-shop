// Update with your config settings.
require('dotenv').config();

module.exports = {
  development: {
    client: process.env.CLIENT,
    connection: {
      host : process.env.HOST,
      database: process.env.DATABASE,
      user: process.env.USER,
      password: process.env.PASSWORD
    },
  }
};
