const { db } = require('../../../../database/db');

const getRolePermissionMapping = async (roleId, permissionId) => {
  try {
    return db('role_permission').where({ roleId, permissionId }).first();
  } catch (error) {
    throw error;
  }
};

const assignRolePermission = async (roleId, permissionId) => {
  try {
    await db('role_permission').insert({ roleId, permissionId });
  } catch (error) {
    throw error;
  }
};
module.exports = { getRolePermissionMapping, assignRolePermission };
