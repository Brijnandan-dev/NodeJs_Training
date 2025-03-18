/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('permission', (table) => {
    table.uuid('permissionId').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('permissionName').unique().notNullable();
    table.text('description').nullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('permission');
};
