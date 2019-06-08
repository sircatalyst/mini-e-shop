
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (table) => {
        table.increments();
        table.string('firstName').notNullable();
        table.string('lastName').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.string('role').notNullable().defaultTo('user');
        //to create update_at and created_at
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users')
};
