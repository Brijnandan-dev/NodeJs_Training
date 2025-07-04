/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('resources', (table) => {
    table.uuid('resourceId').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.text('resourceName').unique().notNullable();
    table.text('description').nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('resources');
};
