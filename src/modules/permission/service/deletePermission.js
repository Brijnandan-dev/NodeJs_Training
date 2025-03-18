
const deletePermissionData = async(db, permissionId) => {
    try {
        return db('permission').where('permissionId', permissionId).del()
    } catch (error) {
        throw error
    }
}



module.exports = deletePermissionData;