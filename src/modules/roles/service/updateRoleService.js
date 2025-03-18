
const updateRoleData = async(db, roleId, roleName, description) => {
    try {
        return await db('roles').where('roleId', roleId).update({roleName, description})
    } catch (error) {
        throw error
    }
}



module.exports = updateRoleData;