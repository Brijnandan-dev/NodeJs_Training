
const deleteRoleData = async(db, roleId) => {
    try {
        return await db('roles').where('roleId', roleId).del()
    } catch (error) {
        throw error
    }
}



module.exports = deleteRoleData;