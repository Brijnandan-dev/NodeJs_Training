const {
  getUserRoleMapping,
  getRolePermissionResource,
} = require('../src/modules/user/service/userRoleService');

const authorize = (resourceName, permissionName) => {
  return async (req, res, next) => {
    try {
      const { userId } = req.user;

      // Get roles assigned to the user
      const roles = await getUserRoleMapping(userId);

      if (!roles.length) {
        return res
          .status(403)
          .json({ message: 'Access Denied: No roles assigned' });
      }

      // Check if role has the required permission for the resource
      const hasAccess = await getRolePermissionResource(
        roles,
        resourceName,
        permissionName
      );

      if (!hasAccess) {
        return res
          .status(403)
          .json({ message: 'Access Denied: Insufficient permissions' });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = authorize;
