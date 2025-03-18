
const addPermission = async(db, permission) => {
    try {
        return db('permission').insert(permission).returning('*')
    } catch (error) {
        throw error
    }
}


module.exports = { addPermission };