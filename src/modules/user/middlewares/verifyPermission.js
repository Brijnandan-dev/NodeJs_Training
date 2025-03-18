const { STATUS_CODES } = require("../../../../constants/constants");
const AppError = require("../../../../utils/appErrors");
const { getUserPermission } = require("../service/userService");

const verifyPermission = (requiredPermission) => async(req, res, next) => {
    try {
        const {userId} = req.user

        const permissionMapping = await getUserPermission(req.db, userId);
        const hasRequiredPermission = permissionMapping.some(
            permission => permission.permissionName === requiredPermission
        );

        if (hasRequiredPermission) {
            return next();
        } else {
            return res.status(STATUS_CODES.FORBIDDEN).json({
                success: false,
                message: `Forbidden: User does not have ${requiredPermission} permission.`,
            });
        }
    } catch (error) {
        next(new AppError('Server error while checking permissions', 500, error));
    }
  };


module.exports = verifyPermission;