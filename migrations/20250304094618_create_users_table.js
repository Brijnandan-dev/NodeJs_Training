/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.uuid('userId').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('username').notNullable();
    table.string('useremail').unique().notNullable();
    table.string('password').notNullable();
    table.boolean('isEmailVerified').notNullable().defaultTo(false);
    table.boolean('isActive').notNullable().defaultTo(true);
    table.timestamps(true, true);
    table.uuid('createdBy').references('userId').inTable('users');
    table.uuid('modifiedBy').references('userId').inTable('users');
    table.boolean('is_verified').defaultTo(false);
    table.string('resetToken');
    table.timestamp('resetTokenExpires');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};

//in this i used knex to create tables (migrations) (need to explore more)
