const { STATUS_CODES, MESSAGES } = require("../../../../constants/constants");
const AppError = require("../../../../utils/appErrors");
const { getRoleData } = require("../service/getRoleService");

const getRole = async(req, res, next) => {
    try {

        const { identifier } = req.body;

        const roleDetails = await getRoleData(identifier);

        if(!roleDetails){
            throw new AppError(MESSAGES.ROLE_NOT_FOUND, STATUS_CODES.NOT_FOUND)
        }

        res.status(STATUS_CODES.SUCCESS).json({ message: 'Role retrieved successfully', role: roleDetails})
    } catch (error) {
        next(error);
    }
}


module.exports = getRole