const { db } = require('../../../../database/db');

const assignRole = async (userId, roleId) => {
  try {
    await db('user_roles').insert({ userId, roleId }).returning('*');
  } catch (error) {
    throw error;
  }
};

//this will return only one user and role not all role for the user
const getRoleMapping = async (userId, roleId) => {
  try {
    return await db('user_roles').where({ userId, roleId }).first();
  } catch (error) {
    throw error;
  }
};

const removeUserRoleMapping = async (userId, roleId) => {
  try {
    await db('user_roles').where({ userId, roleId }).del();
  } catch (error) {
    throw error;
  }
};

//this will returns all user roles
const getUserRoleMapping = async (userId) => {
  try {
    return await db('user_roles').where('userId', userId).pluck('roleId');
  } catch (error) {
    throw error;
  }
};

const getRolePermissionResource = async (
  roles,
  resourceName,
  permissionName
) => {
  try {
    return await db('resource_permission')
      .innerJoin(
        'permission',
        'permission.permissionId',
        'resource_permission.permissionId'
      )
      .innerJoin(
        'resources',
        'resources.resourceId',
        'resource_permission.resourceId'
      )
      .innerJoin(
        'role_permission',
        'role_permission.permissionId',
        'permission.permissionId'
      )
      .whereIn('role_permission.roleId', roles)
      .andWhere('resources.resourceName', resourceName)
      .andWhere('permission.permissionName', permissionName)
      .first();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  assignRole,
  getRoleMapping,
  removeUserRoleMapping,
  getUserRoleMapping,
  getRolePermissionResource,
};
