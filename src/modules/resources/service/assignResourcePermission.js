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

const getResourcePermissions = async (resourceId) => {
  const permissions = await db('resource_permission')
    .join('permission', 'resource_permission.permissionId', 'permission.permissionId')
    .select('permission.permissionName')
    .where('resource_permission.resourceId', resourceId);

  return permissions.map((perm) => perm.permissionName);
};

const assignPermission = async (permissionId, resourceId) => {
  try {
    await db('resource_permission').insert({ resourceId, permissionId });
  } catch (error) {
    throw error;
  }
};

module.exports = { getResourcePermissionMapping, assignPermission, getResourcePermissions };
