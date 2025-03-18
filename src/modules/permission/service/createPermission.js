const { db } = require("../../../../database/db");

const addPermission = async(permission) => {
    try {
        return db('permission').insert(permission).returning('*')
    } catch (error) {
        throw error
    }
}


module.exports = { addPermission };