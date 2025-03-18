const yup  = require("yup")

const permissionSchema = yup.object({
    permissionName: yup.string().strict().trim().required('permissionName is required'),
    description: yup.string().strict().trim().optional()
})

const getPermissionSchema = yup.object({
    identifier: yup.string().strict().trim().required('permissionName or permissionId is required'),
})

const permissionParamsSchema = yup.object({
    permissionId: yup.string().strict().trim().required('permissionId is required'),
});

const updatePermissionSchema = yup.object({
    permissionName: yup.string().strict().trim().optional(),
    description: yup.string().strict().trim().optional()
})

module.exports = {permissionSchema, getPermissionSchema, permissionParamsSchema, updatePermissionSchema}