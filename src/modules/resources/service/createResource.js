const { db } = require('../../../../database/db');

const addResource = async (resource) => {
  try {
    return db('resources').insert(resource).returning(['resourceId']);
  } catch (error) {
    throw error;
  }
};

module.exports = { addResource };
