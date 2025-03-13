const { validate: isUUID } = require('uuid');

const getRoleData = async(db, identifier) => {
    try {
        if (isUUID(identifier)) {
            return db('roles').where('roleId', identifier).first();
        } else {
            return db('roles').where('roleName', identifier).first();
        }
    } catch (error) {
        throw error
    }
}



module.exports = { getRoleData };