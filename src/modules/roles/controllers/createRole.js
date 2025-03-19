const { STATUS_CODES } = require('../../../../constants/constants');
const AppError = require('../../../../utils/appErrors');
const createRoleService = require('../service/createRoleService');
const { getRoleData } = require('../service/getRoleService');

const createRole = async (req, res, next) => {
  try {
    const role = req.body;
    const existingRole = await getRoleData(role.roleName);

    if (existingRole) {
      throw new AppError('Role already exists', 409);
    }

    const roleData = await createRoleService.createRole(role);
    res
      .status(STATUS_CODES.CREATED)
      .json({ message: 'Role create successfully', role: roleData });
  } catch (error) {
    next(error);
  }
};

module.exports = createRole;
