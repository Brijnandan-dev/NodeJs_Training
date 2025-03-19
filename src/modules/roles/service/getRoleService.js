const { validate: isUUID } = require('uuid');
const { db } = require('../../../../database/db');

const getRoleData = async (identifier) => {
  try {
    if (isUUID(identifier)) {
      return db('roles').where('roleId', identifier).first();
    } else {
      return db('roles').where('roleName', identifier).first();
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { getRoleData };
