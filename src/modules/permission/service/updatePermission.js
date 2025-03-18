
const updatePermissionData = async(db, permissionId, permissionName, description) => {
    try {
        return db('permission').where('permissionId', permissionId).update({permissionName, description})
    } catch (error) {
        throw error
    }
}


module.exports = updatePermissionData;