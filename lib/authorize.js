const { STATUS_CODES } = require('../constants/constants');
const { getResourcePermissions } = require('../src/modules/resources/service/assignResourcePermission');
const { getResourceData } = require('../src/modules/resources/service/getResource');
const { getRolePermissions } = require('../src/modules/roles/service/assignRolePermissionService');
const {
  getUserRoles,
} = require('../src/modules/user/service/userRoleService');
const { getUserPermissions } = require('../src/modules/user/service/userService');
const redisClient = require('../utils/redisClient');

const authorize = (resource, requiredPermissions) => {
  return async (req, res, next) => {
    try {
      const { userId } = req.user;

      const cachedUser = await redisClient.get(`user:${userId}`);

      let userData;
      if (cachedUser) {
        userData = JSON.parse(cachedUser);
      } else {
        // Fallback to DB if not in Redis
        const roles = await getUserRoles(userId);
        const rolePermissions = await getRolePermissions(roles);
        const userPermissions = await getUserPermissions(userId);
        const allPermissions = Array.from(new Set([...rolePermissions, ...userPermissions]));

        userData = { roles, permissions: allPermissions };
      }

      // Get the resource ID from the database
      const resourceData = await getResourceData(resource);
      if (!resourceData.resourceId) {
        throw new AppError(`Resource "${resource}" not found`, STATUS_CODES.NOT_FOUND);
      }

      // Get all permissions linked to this resource
      const resourcePermissions = await getResourcePermissions(resourceData.resourceId);

      // Validate that the required permissions exist for this resource
      const invalidPermissions = requiredPermissions.filter(
        (perm) => !resourcePermissions.includes(perm)
      );

      if (invalidPermissions.length > 0) {
        throw new AppError(
          `Invalid permissions [${invalidPermissions.join(', ')}] for resource "${resource}"`,
          STATUS_CODES.FORBIDDEN
        );
      }

      // Check if the user has the required permission
      const hasPermission = requiredPermissions.some((perm) => userData.permissions.includes(perm));

      if (!hasPermission) {
        return res
          .status(STATUS_CODES.FORBIDDEN)
          .json({ message: 'Access Denied: Insufficient permissions' });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = authorize;
