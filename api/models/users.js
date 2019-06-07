const bookshelf = require('../config/bookshelf');

var Users = bookshelf.Model.extend({  
        tableName: 'users',
        hasTimestamps: true,
    },
    {
        
        verifyPassword: function(password) {
            return this.get('password') === password;
        },

        byEmail: function(email) {
            return this.forge().query({where:{ email: email }}).fetch();
        },

        findAll: function(filter, options) {
            return this.forge().where(filter).fetchAll(options);
        },

        findOne: function(query, options) {
            return this.forge(query).fetch(options);
        },

        create: function(data, options) {
            return this.forge(data).save(null, options);
        },
        update: function(id, data) {
            return this.forge().where('id', id).update(data, '*');
        },
        delete: function(id) {
            return connection('sticker').where('id', id).del();
        }
    }
);

module.exports = Users;
