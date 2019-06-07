const bookshelf = require('../config/bookshelf');

var Cart = bookshelf.Model.extend({  
        tableName: 'cart',
        hasTimestamps: true,
    },
    {
        create: function(data, options) {
            return this.forge(data).save(null, options);
        },

        update: function(id, data) {
            return this.forge().where({id: id}).save(data, {method: 'update'});
         
        },

        findOne: function(id, options) {
            return this.forge({id: id}).fetch(options);
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

module.exports = Cart;
