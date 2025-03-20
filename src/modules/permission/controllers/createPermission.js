const { STATUS_CODES } = require('../../../../constants/constants');
const AppError = require('../../../../utils/appErrors');
const { addPermission } = require('../service/createPermission');
const { getPermissionData } = require('../service/getPermission');

const createPermission = async (req, res, next) => {
  try {
    const permission = req.body;
    const existingPermission = await getPermissionData(
      permission.permissionName
    );

    if (existingPermission) {
      throw new AppError('Permission already exists', STATUS_CODES.CONFLICT);
    }

    const permissionData = await addPermission(permission);
    res.status(STATUS_CODES.CREATED).json({
      message: 'Permission create successfully',
      permission: permissionData,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createPermission;
