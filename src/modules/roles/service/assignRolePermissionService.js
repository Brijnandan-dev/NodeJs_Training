const { db } = require('../../../../database/db');

const getRolePermissionMapping = async (roleId, permissionId) => {
  try {
    return db('role_permission').where({ roleId, permissionId }).first();
  } catch (error) {
    throw error;
  }
};

const getRolePermissions = async (roles) => {
  const permissions = await db('role_permission')
    .join('permission', 'permission.permissionId', '=', 'role_permission.permissionId')
    .join('roles', 'roles.roleId', '=', 'role_permission.roleId')
    .select('permission.permissionName')
    .whereIn('roles.roleName', roles);

  return permissions.map((permission) => permission.permissionName);
};

const assignRolePermission = async (roleId, permissionId) => {
  try {
    await db('role_permission').insert({ roleId, permissionId });
  } catch (error) {
    throw error;
  }
};
module.exports = { getRolePermissionMapping, assignRolePermission, getRolePermissions };
