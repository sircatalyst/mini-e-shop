const bookshelf = require('../config/bookshelf');

var Order = bookshelf.Model.extend({  
        tableName: 'cart',
        hasTimestamps: true,
    },
    {
        update: function(id, data) {
            return this.forge().where({id: id}).save(data, {method: 'update'});
        },

        findOne: function(id, options) {
            return this.forge({id: id, ordered: "1"}).fetch(options);
        },

        findAll: function(options) {
            return this.forge({ordered: "1"}).fetchAll(options);
        },

    }
);

module.exports = Order;
