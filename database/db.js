const knex = require('knex');

require('dotenv').config(); // Load environment variables

const dbConfig = {
  client: process.env.DB_CLIENT, // Default to PostgreSQL
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  pool: { min: 2, max: 10 }, // Connection pool settings
  migrations: {
    directory: './migrations', //Stores migration history to track applied migrations.
  },
  tableName: 'knex_migrations',
  seeds: {
    directory: './seeds', // Pointing to the seeds folder
  },
};

const db = knex(dbConfig);

module.exports = { dbConfig, db };
