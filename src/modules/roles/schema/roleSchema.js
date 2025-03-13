const yup  = require("yup")

const roleSchema = yup.object({
    roleName: yup.string().strict().trim().required('roleName is required'),
    description: yup.string().strict().trim().optional()
})

const getRoleSchema = yup.object({
    identifier: yup.string().strict().trim().required('roleName or roleId is required'),
})

module.exports = {roleSchema, getRoleSchema}