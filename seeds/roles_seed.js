/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('roles').del();
  await knex('roles').insert([
    { roleName: 'admin', description: 'Administrator with full access' },
    { roleName: 'user', description: 'Regular user with limited access' },
    {
      roleName: 'moderator',
      description: 'Moderator with content management permissions',
    },
  ]);
};
