/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('user_permission', (table) => {
        table.uuid('userPermissionId').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('userId').notNullable();
        table.uuid('permissionId').notNullable();
        table.foreign('userId').references('userId').inTable('users').onDelete('CASCADE');
        table.foreign('permissionId').references('permissionId').inTable('permission').onDelete('CASCADE');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user_permission');
};
