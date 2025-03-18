const { validate: isUUID } = require('uuid');
const { db } = require('../../../../database/db');

const getPermissionData = async(identifier) => {
    try {
        if (isUUID(identifier)) {
            return db('permission').where('permissionId', identifier).first();
        } else {
            return db('permission').where('permissionName', identifier).first();
        }
    } catch (error) {
        throw error
    }
}



module.exports = { getPermissionData };