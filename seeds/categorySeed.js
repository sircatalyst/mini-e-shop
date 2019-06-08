const categorySeedSample = require('../seedSamples/categorySeedSample');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert(categorySeedSample);
    });
};
