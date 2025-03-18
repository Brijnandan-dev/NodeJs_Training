const { MESSAGES, STATUS_CODES } = require("../../../../constants/constants")
const AppError = require("../../../../utils/appErrors")
const deleteRoleData = require("../service/deleteRoleService")
const { getRoleData } = require("../service/getRoleService")


const deleteRole = async(req, res, next) => {
    try {
        const {roleId} = req.params
        
        const roleDetails = await getRoleData(req.db, roleId)

        if(!roleDetails){
            throw new AppError(MESSAGES.ROLE_NOT_FOUND,STATUS_CODES.NOT_FOUND)
        }

        await deleteRoleData(req.db, roleId)
        res.status(STATUS_CODES.SUCCESS).json({ message: 'Role deleted successfully' });
    } catch (error) {
        next(error)
    }
}

module.exports = deleteRole