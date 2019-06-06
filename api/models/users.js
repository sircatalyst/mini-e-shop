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
    }
);

module.exports = Users;
