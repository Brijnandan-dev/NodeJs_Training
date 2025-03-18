const { db } = require("../../../../database/db");

const createRole = async(role) => {
    try {
        const [roleId] = await db('roles').insert(role).returning(['roleId']);
        return roleId;
    } catch (error) {
        throw error
    }
}

const checkRole = async(role) => db('roles').where('roleName', role.roleName).first();



module.exports = { createRole, checkRole };