const { MESSAGES, STATUS_CODES } = require("../../../../constants/constants")
const AppError = require("../../../../utils/appErrors")
const deletePermissionData = require("../service/deletePermission")
const { getPermissionData } = require("../service/getPermission")

const deletePermission = async(req, res, next) => {
    try {
        const {permissionId} = req.params
        const permissionDetails = await getPermissionData(req.db, permissionId)

        if(!permissionDetails){
            throw new AppError(MESSAGES.PERMISSION_NOT_FOUND,STATUS_CODES.NOT_FOUND)
        }

        await deletePermissionData(req.db, permissionId)
        res.status(STATUS_CODES.SUCCESS).json({ message: 'Permission deleted successfully' });
    } catch (error) {
        next(error)
    }
}

module.exports = deletePermission