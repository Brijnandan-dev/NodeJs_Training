const yup  = require("yup")

const userPermissionSchema = yup.object({
    permissionId: yup.string().strict().trim().required('permissionId is required'),
    userId: yup.string().strict().trim().required('userId is required')
})

module.exports = {userPermissionSchema}