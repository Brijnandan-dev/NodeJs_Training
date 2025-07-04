/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('role_permission', (table) => {
    table
      .uuid('rolePermissionId')
      .primary()
      .defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('roleId').notNullable();
    table.uuid('permissionId').notNullable();
    table
      .foreign('roleId')
      .references('roleId')
      .inTable('roles')
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
  return knex.schema.dropTableIfExists('role_permission');
};
