const { STATUS_CODES, MESSAGES } = require("../../../../constants/constants");
const AppError = require("../../../../utils/appErrors");
const { getPermissionData } = require("../service/getPermission");

const getPermission = async(req, res, next) => {
    try {
        const { identifier } = req.body;

        const permissionDetails = await getPermissionData(identifier);

        if(!permissionDetails){
            throw new AppError(MESSAGES.PERMISSION_NOT_FOUND, STATUS_CODES.NOT_FOUND)
        }

        res.status(STATUS_CODES.SUCCESS).json({ message: 'Permission retrieved successfully', permission: permissionDetails})
    } catch (error) {
        next(error);
    }
}


module.exports = getPermission