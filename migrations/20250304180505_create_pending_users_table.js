/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('pending_users', (table) => {
    table.uuid('userId').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('username').notNullable();
    table.string('useremail').unique().notNullable();
    table.string('password').notNullable();
    table.timestamps(true, true);
    table.uuid('createdBy').references('userId').inTable('users');
    table.uuid('modifiedBy').references('userId').inTable('users');
    table.string('verification_token').nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('pending_users');
};
