const { dbConfig } = require('./database/db');

module.exports = {
  development: dbConfig,
};

//we need this file for for CLI-based database migrations and seeding. it is standard configuration file for knex
