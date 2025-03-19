/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('resource_permission', (table) => {
    table
      .uuid('resourcePermissionId')
      .primary()
      .defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('resourceId').notNullable();
    table.uuid('permissionId').notNullable();
    table
      .foreign('resourceId')
      .references('resourceId')
      .inTable('resources')
      .onDelete('CASCADE');
    table
      .foreign('permissionId')
      .references('permissionId')
      .inTable('permission')
      .onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('resource_permission');
};
