
const createRole = async(db, role) => {
    try {
        return db('roles').insert(role).returning('*')
    } catch (error) {
        throw error
    }
}

const checkRole = async(db, role) => db('roles').where('roleName', role.roleName).first();



module.exports = { createRole, checkRole };