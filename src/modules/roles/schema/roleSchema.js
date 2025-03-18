const yup  = require("yup")

const roleSchema = yup.object({
    roleName: yup.string().strict().trim().required('roleName is required'),
    description: yup.string().strict().trim().optional()
})

const getRoleSchema = yup.object({
    identifier: yup.string().strict().trim().required('roleName or roleId is required'),
})

const updateRoleBodySchema = yup.object({
    roleName: yup.string().strict().trim().optional(),
    description: yup.string().strict().trim().optional(),
});

const roleParamsSchema = yup.object({
    roleId: yup.string().strict().trim().required('roleId is required'),
});

module.exports = {roleSchema, getRoleSchema, updateRoleBodySchema, roleParamsSchema}