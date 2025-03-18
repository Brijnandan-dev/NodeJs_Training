const yup  = require("yup")

const userRoleSchema = yup.object({
    roleId: yup.string().strict().trim().required('roleId is required'),
    userId: yup.string().strict().trim().required('userId is required')
})

module.exports = {userRoleSchema}