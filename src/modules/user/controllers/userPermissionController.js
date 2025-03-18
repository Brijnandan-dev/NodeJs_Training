const { MESSAGES, STATUS_CODES } = require("../../../../constants/constants");
const AppError = require("../../../../utils/appErrors");
const redisClient = require("../../../../utils/redisClient");
const { getPermissionData } = require("../../permission/service/getPermission");
const { assignPermission, getPermissionMapping, removeUserPermissionMapping } = require("../service/userPermissionService");
const { getUsersById } = require("../service/userService");


const assignPermissionToUser = async(req, res, next) => {
    try {
        const {userId, permissionId} = req.body
        //check in redis cache first for user
        let userDetails = await redisClient.get(`user:${userId}`);

        if(!userDetails){
            //if not in cache then check in db 
            userDetails = await getUsersById(userId);
            if(!userDetails){
                throw new AppError(MESSAGES.USER_NOT_FOUND, STATUS_CODES.NOT_FOUND);
            }
        }

        const permissionDetails = await getPermissionData(permissionId);

        if(!permissionDetails){
            throw new AppError(MESSAGES.PERMISSION_NOT_FOUND, STATUS_CODES.NOT_FOUND)
        }

        const existing = await getPermissionMapping(userId, permissionId);
        if (existing) {
            throw new AppError(MESSAGES.PERMISSION_ALREADY_ASSIGNED, STATUS_CODES.CONFLICT);
        }

        await assignPermission(userId, permissionId);
        res.status(STATUS_CODES.SUCCESS).json({ message: 'Permission assigned successfully' });
    } catch (error) {
        next(error);
    }
}



const removeUserPermission = async(req, res, next) => {
    try {
        const {userId, permissionId} = req.body

        let userPermissionMapping = await getPermissionMapping(userId, permissionId);
        if(!userPermissionMapping){
            throw new AppError('Permission not assigned to user', STATUS_CODES.NOT_FOUND);
        }

        
        await removeUserPermissionMapping(userId, permissionId);
        res.status(STATUS_CODES.SUCCESS).json({ message: 'Permission removed for user successfully' });
    } catch (error) {
        next(error);
    }
}


module.exports = {assignPermissionToUser, removeUserPermission};