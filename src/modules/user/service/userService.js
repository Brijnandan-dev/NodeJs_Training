const {v4: uuid} = require('uuid');
const AppError = require('../../../../utils/appErrors');
const bcrypt = require('bcrypt');

const getAllUsers = () => db('users').select('*');

const getUsersByEmailOrUserName = (db, identifier) => db('users').where('username', identifier).orWhere('useremail', identifier).first();

const getUsersById = (db, userId) => db('users').where('userId', userId).first();

const createUser = (user) =>{
    const newUser = {
        ...user,
        verification_token
    }
    return db('users').insert(newUser).returning('*');
} 

const storePendingUser = async(db, user) => {
    try {
        const existingUser = await db('users').where('useremail', user.useremail).first()
        const pendingUser = await db('pending_users').where('useremail', user.useremail).first()
        console.log("23456789")
        if(existingUser) {
            throw new AppError('User already registered', 409)
        } 

        if(pendingUser) {
            throw new AppError('A verification mail has already sent, Check you mail for verification', 409)
        }

        const verification_token = uuid();

        const hashedPassword = await bcrypt.hash(user.password, 10);
        
        //insert into pending_users db
        await db('pending_users').insert({
            ...user,
            password: hashedPassword,
            verification_token
        });

        return verification_token; //for sending in mail used for verification
    } catch (error) {
        // console.log('error', error)
        throw error
    }
}

const verifyAndRegisterUser = async(db, token) => {
    try {
        const pendingUser = await db('pending_users').where('verification_token', token).first();
        const tokenExpiryTime = new Date(Date.now() - 24 * 60 * 60 * 1000);

        if(!pendingUser || pendingUser.created_at < tokenExpiryTime){ 
            throw new AppError('Invalid or expired token', 400 );
        }

        //transaction for data consistency and prevent partial operations so that both add and delete operation work completelty
        const { verification_token, ...userData } = pendingUser;
        await db.transaction(async (trx) => {
            await trx('users').insert({
                ...userData,
                isEmailVerified :true,
                is_verified: true
            });//add into users
            await trx('pending_users').where('userId', pendingUser.userId).del(); // Delete from pending_users
        });

        return {message : 'Email verified successfully.'}
    } catch (error) {
        throw error
    }
}

const resetUserPassword = async(db, user, newPassword) => {
    try {
        await db('users').where('userId', user.userId).update({ password: newPassword })
    } catch (error) {
        console.log("4567890")
        throw error
    }
}

const updateUser = async(db, newDetails) => {
    try {
        const {username, useremail, userId} = newDetails
        await db('users').where('userId', userId).update(newDetails)
    } catch (error) {
        throw error
    }
}

module.exports = { getAllUsers, storePendingUser, createUser, verifyAndRegisterUser, getUsersByEmailOrUserName, resetUserPassword, getUsersById, updateUser };

//here all the db operations