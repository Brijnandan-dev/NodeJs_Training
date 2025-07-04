const { v4: uuid } = require('uuid');
const AppError = require('../../../../utils/appErrors');
const bcrypt = require('bcrypt');
const { db } = require('../../../../database/db');
const { STATUS_CODES, MESSAGES } = require('../../../../constants/constants');

const getAllUsers = () => db('users').select('*');

const getUsersByEmailOrUserName = (identifier) =>
  db('users')
    .where('username', identifier)
    .orWhere('useremail', identifier)
    .first();

const getUsersById = (userId) =>
  db('users')
    .select(
      'userId',
      'username',
      'useremail',
      'isEmailVerified',
      'isActive',
      'is_verified'
    )
    .where('userId', userId)
    .first();

const createUser = (user) => {
  const newUser = {
    ...user,
    verification_token,
  };
  return db('users').insert(newUser).returning('*');
};

const storePendingUser = async (user) => {
  try {
    const existingUser = await db('users')
      .where('useremail', user.useremail)
      .first();
    const pendingUser = await db('pending_users')
      .where('useremail', user.useremail)
      .first();

    if (existingUser) {
      throw new AppError('User already registered',  STATUS_CODES.CONFLICT);
    }

    if (pendingUser) {
      throw new AppError(
        'A verification mail has already sent, Check you mail for verification',
        STATUS_CODES.CONFLICT
      );
    }

    const verification_token = uuid();

    const hashedPassword = await bcrypt.hash(user.password, 10);

    //insert into pending_users db
    await db('pending_users').insert({
      ...user,
      password: hashedPassword,
      verification_token,
    });

    return verification_token; //for sending in mail used for verification
  } catch (error) {
    throw error;
  }
};

const verifyAndRegisterUser = async (token) => {
  try {
    const pendingUser = await db('pending_users')
      .select(
        'userId',
        'username',
        'useremail',
        'password',
        'createdBy',
        'modifiedBy',
        'created_at',
        'updated_at'
      )
      .where('verification_token', token)
      .first();
    const tokenExpiryTime = new Date(Date.now() - 24 * 60 * 60 * 1000);

    if (!pendingUser || pendingUser.created_at < tokenExpiryTime) {
      throw new AppError('Invalid or expired token', 400);
    }

    //transaction for data consistency and prevent partial operations so that both add and delete operation work completelty

    await db.transaction(async (trx) => {
      await trx('users').insert({
        ...pendingUser,
        isEmailVerified: true,
        is_verified: true,
      }); //add into users

      const defaultRole = await trx('roles').select('roleId').where('roleName', 'user').first();

      if (!defaultRole) {
        throw new AppError(MESSAGES.DEFAULT_ROLE_NOT_FOUND, STATUS_CODES.NOT_FOUND);
      }

      await trx('user_roles'). insert({userId: pendingUser.userId, roleId: defaultRole.roleId});

      await trx('pending_users').where('userId', pendingUser.userId).del(); // Delete from pending_users
    });

    return { message: 'Email verified successfully.' };
  } catch (error) {
    throw error;
  }
};

const resetUserPassword = async (user, newPassword) => {
  try {
    await db('users')
      .where('userId', user.userId)
      .update({ password: newPassword });
  } catch (error) {
    throw error;
  }
};

const updateUser = async (newDetails) => {
  try {
    await db('users').where('userId', newDetails.userId).update(newDetails);
  } catch (error) {
    throw error;
  }
};

const getUserPermissions = async (userId) => {
  try {
    const permissions = await db('permission as p')
      .join('user_permission as up', 'up.permissionId', 'p.permissionId')
      .select('p.permissionName')
      .where('up.userId', userId);

    return permissions.map((permission) => permission.permissionName);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUsers,
  storePendingUser,
  createUser,
  verifyAndRegisterUser,
  getUsersByEmailOrUserName,
  resetUserPassword,
  getUsersById,
  updateUser,
  getUserPermissions,
};
