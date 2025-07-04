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

const getUserRoles = async (userId) => {
  const roles = await db('user_roles')
    .join('roles', 'user_roles.roleId', '=', 'roles.roleId')
    .select('roles.roleName')
    .where('user_roles.userId', userId);

  return roles.map((role) => role.roleName);
};


module.exports = {
  assignRole,
  getRoleMapping,
  removeUserRoleMapping,
  getUserRoleMapping,
  getUserRoles
};
