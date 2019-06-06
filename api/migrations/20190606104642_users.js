
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (table) => {
        table.increments();
        table.string('firstName').notNullable();
        table.string('lastName').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.datetime('created_at').notNullable();
        table.datetime('updated_at').notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users')
};
