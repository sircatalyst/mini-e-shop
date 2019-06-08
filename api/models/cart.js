const bookshelf = require('../config/bookshelf');

var Cart = bookshelf.Model.extend({  
        tableName: 'cart',
        hasTimestamps: true,
    },
    {
        create: function(data, options) {
            return this.forge(data).save(null, options);
        },

        update: function(id, userId, data ) {
            return this.forge().where({id: id, user_id: userId}).save(data, {method: 'update'});
        },

        findOne: function(id, userId, options) {
            return this.forge({id: id, user_id: userId}).fetch(options);
        },

        findByName: function(query, options) {
            return this.forge({name: query}).fetch(options);
        },

        findAll: function(userId, options) {
            return this.forge({ordered: "0", user_id: userId}).fetchAll(options);
        },

        delete: function(id, userId) {
            return this.forge().where({id: id, user_id: userId}).destroy();
        }
    }
);

module.exports = Cart;
