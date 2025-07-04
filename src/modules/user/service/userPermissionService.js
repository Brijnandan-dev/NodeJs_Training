const { db } = require('../../../../database/db');

const assignPermission = async (userId, permissionId) => {
  try {
    await db('user_permission').insert({ userId, permissionId });
  } catch (error) {
    throw error;
  }
};

const getPermissionMapping = async (userId, permissionId) => {
  try {
    return db('user_permission').where({ userId, permissionId }).first();
  } catch (error) {
    throw error;
  }
};

const removeUserPermissionMapping = async (userId, permissionId) => {
  try {
    await db('user_permission').where({ userId, permissionId }).del();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  assignPermission,
  getPermissionMapping,
  removeUserPermissionMapping,
};
