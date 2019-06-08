exports.up = function(knex, Promise) {
    return knex.schema.createTable('cart', (table) => {
        table.increments();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('id').inTable('users');
        table.integer('product_id').unsigned().notNullable();
        table.foreign('product_id').references('id').inTable('product');
        table.string('product_name').notNullable();
        table.string('description').notNullable();
        table.string('price').notNullable();
        table.string('ordered').notNullable();
        //to create update_at and created_at
        table.timestamps();
    });  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('cart')
};
