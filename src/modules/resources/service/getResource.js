const { validate: isUUID } = require('uuid');
const { db } = require('../../../../database/db');

const getResourceData = async (identifier) => {
  try {
    if (isUUID(identifier)) {
      return db('resources').where('resourceId', identifier).first();
    } else {
      return db('resources').where('resourceName', identifier).first();
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { getResourceData };
