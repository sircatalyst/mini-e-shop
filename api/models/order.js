const bookshelf = require('../config/bookshelf');

var Order = bookshelf.Model.extend({  
        tableName: 'cart',
        hasTimestamps: true,
    },
    {
        update: function(id, userId, data ) {
            return this.forge().where({id: id, user_id: userId}).save(data, {method: 'update'});
        },

        findOne: function(id, userId, options) {
            return this.forge({id: id, ordered: "1", user_id: userId}).fetch(options);
        },

        findAll: function(userId, options) {
            return this.forge({ordered: "1", user_id: userId}).fetchAll(options);
        },

    }
);

module.exports = Order;
