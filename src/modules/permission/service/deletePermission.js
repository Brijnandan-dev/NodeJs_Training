const { db } = require('../../../../database/db');

const deletePermissionData = async (permissionId) => {
  try {
    return db('permission').where('permissionId', permissionId).del();
  } catch (error) {
    throw error;
  }
};

module.exports = deletePermissionData;
