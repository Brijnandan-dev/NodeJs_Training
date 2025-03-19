const { MESSAGES, STATUS_CODES } = require('../../../../constants/constants');
const AppError = require('../../../../utils/appErrors');
const { getPermissionData } = require('../../permission/service/getPermission');
const {
  getResourcePermissionMapping,
  assignPermission,
} = require('../service/assignResourcePermission');
const { getResourceData } = require('../service/getResource');

const assignPermissionToResource = async (req, res, next) => {
  try {
    const { permissionId, resourceId } = req.body;

    const permissionDetails = await getPermissionData(permissionId);

    if (!permissionDetails) {
      throw new AppError(MESSAGES.PERMISSION_NOT_FOUND, STATUS_CODES.NOT_FOUND);
    }

    const resourceDetails = await getResourceData(resourceId);

    if (!resourceDetails) {
      throw new AppError(MESSAGES.RESOURCE_NOT_FOUND, STATUS_CODES.NOT_FOUND);
    }

    const existing = await getResourcePermissionMapping(
      permissionId,
      resourceId
    );
    if (existing) {
      throw new AppError(
        MESSAGES.PERMISSION_ALREADY_ASSIGNED,
        STATUS_CODES.CONFLICT
      );
    }

    await assignPermission(permissionId, resourceId);
    res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: 'Permission assigned successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = assignPermissionToResource;
