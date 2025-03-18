const { MESSAGES, STATUS_CODES } = require("../../../../constants/constants");
const AppError = require("../../../../utils/appErrors");
const redisClient = require("../../../../utils/redisClient");
const { getRoleData } = require("../../roles/service/getRoleService");
const {assignRole, getRoleMapping, removeUserRoleMapping} = require("../service/userRoleService");
const { getUsersById } = require("../service/userService");


const assignRoleToUser = async(req, res, next) => {
    try {
        const {userId, roleId} = req.body
        //check in redis cache first for user
        let userDetails = await redisClient.get(`user:${userId}`);

        if(!userDetails){
            //if not in cache then check in db 
            userDetails = await getUsersById(req.db, userId);
            if(!userDetails){
                throw new AppError(MESSAGES.USER_NOT_FOUND, STATUS_CODES.NOT_FOUND);
            }
        }

        const roleDetails = await getRoleData(req.db, roleId);

        if(!roleDetails){
            throw new AppError(MESSAGES.ROLE_NOT_FOUND, STATUS_CODES.NOT_FOUND)
        }

        const existingAssignment = await getRoleMapping(req.db, userId, roleId);
        if (existingAssignment) {
            throw new AppError(MESSAGES.ROLE_ALREADY_ASSIGNED, STATUS_CODES.CONFLICT);
        }

        await assignRole(req.db, userId, roleId);
        res.status(STATUS_CODES.SUCCESS).json({ message: 'Role assigned successfully' });
    } catch (error) {
        next(error);
    }
}



const removeUserRole = async(req, res, next) => {
    try {
        const {userId, roleId} = req.body

        let userRoleMapping = await getRoleMapping(req.db, userId, roleId);
        if(!userRoleMapping){
            throw new AppError('Role not assigned to user', STATUS_CODES.NOT_FOUND);
        }

        
        await removeUserRoleMapping(req.db, userId, roleId);
        res.status(STATUS_CODES.SUCCESS).json({ message: 'Role removed from user successfully' });
    } catch (error) {
        next(error);
    }
}


module.exports = {assignRoleToUser, removeUserRole};