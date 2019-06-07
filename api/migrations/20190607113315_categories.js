
exports.up = function(knex, Promise) {
    return knex.schema.createTable('categories', (table) => {
        table.increments();
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.string('tag');
        //to create update_at and created_at
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('categories')
};

