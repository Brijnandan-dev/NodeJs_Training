const { MESSAGES, STATUS_CODES } = require('../../../../constants/constants');
const AppError = require('../../../../utils/appErrors');
const { getPermissionData } = require('../../permission/service/getPermission');
const {
  getRolePermissionMapping,
  assignRolePermission,
} = require('../service/assignRolePermissionService');
const { getRoleData } = require('../service/getRoleService');

const assignPermissionToRole = async (req, res, next) => {
  try {
    const { roleId, permissionId } = req.body;

    const permissionDetails = await getPermissionData(permissionId);

    if (!permissionDetails) {
      throw new AppError(MESSAGES.PERMISSION_NOT_FOUND, STATUS_CODES.NOT_FOUND);
    }

    const roleDetails = await getRoleData(roleId);

    if (!roleDetails) {
      throw new AppError(MESSAGES.ROLE_NOT_FOUND, STATUS_CODES.NOT_FOUND);
    }

    const existing = await getRolePermissionMapping(roleId, permissionId);
    if (existing) {
      throw new AppError(
        MESSAGES.PERMISSION_ALREADY_ASSIGNED,
        STATUS_CODES.CONFLICT
      );
    }

    await assignRolePermission(roleId, permissionId);
    res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: 'Permission assigned successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = assignPermissionToRole;
