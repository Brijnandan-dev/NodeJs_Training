const { MESSAGES, STATUS_CODES } = require("../../../../constants/constants");
const AppError = require("../../../../utils/appErrors");
const { getRoleData } = require("../service/getRoleService");
const updateRoleData = require("../service/updateRoleService");

const updateRole = async (req, res, next) => {
    try {
        const { roleId } = req.params;
        const { roleName, description } = req.body
        const roleDetails = await getRoleData(roleId)

        if (!roleDetails) {
            throw new AppError(MESSAGES.ROLE_NOT_FOUND, STATUS_CODES.NOT_FOUND)
        }

        await updateRoleData(roleId, roleName, description)
        res.status(STATUS_CODES.SUCCESS).json({ message: 'Role updated successfully' });
    } catch (error) {
        next(error)
    }
}

module.exports = updateRole;