const yup = require('yup');

const resourceSchema = yup.object({
  resourceName: yup
    .string()
    .strict()
    .trim()
    .required('resourceName is required'),
  description: yup.string().strict().trim().optional(),
});

const getResourceSchema = yup.object({
  identifier: yup
    .string()
    .strict()
    .trim()
    .required('resourceName or permissionId is required'),
});

const resourcePermissionSchema = yup.object({
  resourceId: yup.string().strict().trim().required('resourceId is required'),
  permissionId: yup
    .string()
    .strict()
    .trim()
    .required('permissionId is required'),
});

module.exports = {
  resourceSchema,
  getResourceSchema,
  resourcePermissionSchema,
};
