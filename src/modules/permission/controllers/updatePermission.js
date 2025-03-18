const { MESSAGES, STATUS_CODES } = require("../../../../constants/constants");
const AppError = require("../../../../utils/appErrors");
const { getPermissionData } = require("../service/getPermission");
const updatePermissionData = require("../service/updatePermission");

const updatePermission = async (req, res, next) => {
    try {
        const { permissionId } = req.params;
        const { permissionName, description } = req.body
        const permissionDetails = await getPermissionData(permissionId)

        if (!permissionDetails) {
            throw new AppError(MESSAGES.PERMISSION_NOT_FOUND, STATUS_CODES.NOT_FOUND)
        }

        await updatePermissionData(permissionId, permissionName, description)
        res.status(STATUS_CODES.SUCCESS).json({ message: 'Permission updated successfully' });
    } catch (error) {
        next(error)
    }
}

module.exports = updatePermission;