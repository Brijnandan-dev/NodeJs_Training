const { db } = require('../../../../database/db');

const updatePermissionData = async (
  permissionId,
  permissionName,
  description
) => {
  try {
    return db('permission')
      .where('permissionId', permissionId)
      .update({ permissionName, description });
  } catch (error) {
    throw error;
  }
};

module.exports = updatePermissionData;
