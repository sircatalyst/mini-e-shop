const bookshelf = require('../config/bookshelf');

var Users = bookshelf.Model.extend({  
        tableName: 'users',
        hasTimestamps: true,
    },
    {
        create: function(data, options) {
            return this.forge(data).save(null, options);
        },

        findByEmail: function(email) {
            return this.forge().query({where:{ email: email }}).fetch();
        },
    }
);

module.exports = Users;
