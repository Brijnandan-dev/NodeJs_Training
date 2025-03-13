/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('user_roles', (table) => {
        table.uuid('userRoleId').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('userId').notNullable();
        table.uuid('roleId').notNullable();
        table.foreign('userId').references('userId').inTable('users').onDelete('CASCADE');;
        table.foreign('roleId').references('roleId').inTable('roles').onDelete('CASCADE');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user_roles');
};
