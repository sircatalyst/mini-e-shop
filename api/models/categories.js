const bookshelf = require('../config/bookshelf');

var Categories = bookshelf.Model.extend({  
        tableName: 'categories',
        hasTimestamps: true,
    },
    {
        create: function(data, options) {
            return this.forge(data).save(null, options);
        },

        update: function(id, data) {
            return this.forge().where('id', id).update(data, '*');
        },

        findOne: function(query, options) {
            return this.forge(query).fetch(options);
        },

        findByName: function(query, options) {
            return this.forge({name: query}).fetch(options);
        },

        findAll: function(options) {
            return this.forge().fetchAll(options);
        },

        delete: function(id) {
            return this.forge().where(id).destroy();
        }
    }
);

module.exports = Categories;
