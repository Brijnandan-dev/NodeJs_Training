const { db } = require('../../../../database/db');

const getResourcePermissionMapping = async (permissionId, resourceId) => {
  try {
    return db('resource_permission')
      .where({ permissionId, resourceId })
      .first();
  } catch (error) {
    throw error;
  }
};

const assignPermission = async (permissionId, resourceId) => {
  try {
    await db('resource_permission').insert({ resourceId, permissionId });
  } catch (error) {
    throw error;
  }
};

module.exports = { getResourcePermissionMapping, assignPermission };
