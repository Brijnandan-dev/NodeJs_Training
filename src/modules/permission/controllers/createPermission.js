const { STATUS_CODES } = require("../../../../constants/constants");
const AppError = require("../../../../utils/appErrors");
const { addPermission } = require("../service/createPermission");
const { getPermissionData } = require("../service/getPermission");

const createPermission = async(req, res, next) => {
    try {
        const permission = req.body
        const existingPermission = await getPermissionData(req.db, permission.permissionName)

        if(existingPermission){
            throw new AppError('Permission already exists', 409)
        }

        const permissionData = await addPermission(req.db, permission)
        res.status(STATUS_CODES.CREATED).json({ message: 'Permission create successfully', permission: permissionData})
    } catch (error) {
        next(error);
    }
}


module.exports = createPermission