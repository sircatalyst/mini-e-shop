exports.up = function(knex, Promise) {
    return knex.schema.createTable('products', (table) => {
        table.increments();
        table.integer('categories_id').unsigned().notNullable();
        table.foreign('categories_id').references('id').inTable('categories');
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.string('price').notNullable();
        //to create update_at and created_at
        table.timestamps();
    });  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('products')
};
