const { MESSAGES, STATUS_CODES } = require('../../../../constants/constants');
const AppError = require('../../../../utils/appErrors');
const redisClient = require('../../../../utils/redisClient');
const { getRoleData } = require('../../roles/service/getRoleService');
const {
  assignRole,
  getRoleMapping,
  removeUserRoleMapping,
  getUserRoleMapping,
} = require('../service/userRoleService');
const { getUsersById } = require('../service/userService');

const assignRoleToUser = async (req, res, next) => {
  try {
    const { userId, roleId } = req.body;
    //check in redis cache first for user
    let userDetails = await redisClient.get(`user:${userId}`);

    if (!userDetails) {
      //if not in cache then check in db
      userDetails = await getUsersById(userId);
      if (!userDetails) {
        throw new AppError(MESSAGES.USER_NOT_FOUND, STATUS_CODES.NOT_FOUND);
      }
    }

    const roleDetails = await getRoleData(roleId);

    if (!roleDetails) {
      throw new AppError(MESSAGES.ROLE_NOT_FOUND, STATUS_CODES.NOT_FOUND);
    }

    const existingAssignment = await getRoleMapping(userId, roleId);
    if (existingAssignment) {
      throw new AppError(MESSAGES.ROLE_ALREADY_ASSIGNED, STATUS_CODES.CONFLICT);
    }

    await assignRole(userId, roleId);
    res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: 'Role assigned successfully' });
  } catch (error) {
    next(error);
  }
};

const removeUserRole = async (req, res, next) => {
  try {
    const { userId, roleId } = req.body;

    let userRoleMapping = await getRoleMapping(userId, roleId);
    if (!userRoleMapping) {
      throw new AppError('Role not assigned to user', STATUS_CODES.NOT_FOUND);
    }

    await removeUserRoleMapping(userId, roleId);
    res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: 'Role removed from user successfully' });
  } catch (error) {
    next(error);
  }
};

const getUserRole = async (req, res, next) => {
  try {
    const { userId } = req.user;

    let userRoleIds = await getUserRoleMapping(userId);
    if (!userRoleIds.length) {
      throw new AppError('Role not assigned to user', STATUS_CODES.NOT_FOUND);
    }

    res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: 'User roleId\'s fetched successfully', userRoleIds });
  } catch (error) {
    next(error);
  }
};

module.exports = { assignRoleToUser, removeUserRole, getUserRole };
