const { db } = require("../../../../database/db")

const assignRole = async (userId, roleId) => {
    try {
        await db('user_roles').insert({userId, roleId}).returning('*')
    } catch (error) {
        throw error
    }
}

const getRoleMapping = async(userId, roleId) => {
    try {
        return await db('user_roles').where({userId, roleId}).first()
    } catch (error) {
        throw error
    }
}

const removeUserRoleMapping = async(userId, roleId) => {
    try {
        await db('user_roles').where({userId, roleId}).del();
    } catch (error) {
        throw error
    }
}

module.exports = {assignRole, getRoleMapping, removeUserRoleMapping}