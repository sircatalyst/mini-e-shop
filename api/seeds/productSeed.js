const productSeedSample = require('../seedSamples/productSeedSample');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert(productSeedSample);
    });
};
