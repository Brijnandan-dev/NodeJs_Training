const AppError = require('../../../../utils/appErrors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendVerificationEmail } = require('../service/emailService');
const UserService = require('../service/userService');
const { MESSAGES, STATUS_CODES, ACCESS_TOKEN_EXPIRATION, REFRESH_TOKEN_EXPIRATION } = require('../../../../constants/constants');
const redisClient = require('../../../../utils/redisClient');

const signUp = async(req, res, next) => {
    try {
      const { useremail } = req.body;

      //initially store in pending users if not already present in both users or in pending_users table
      const verification_token = await UserService.storePendingUser(req.body);

      await sendVerificationEmail(useremail, verification_token, 'verify/email'); //this will handle the logic for sending email

      res.status(STATUS_CODES.SUCCESS).json({ message: 'Verification email sent. Please check your mail inbox.' });
      
    } catch (error) {
      next(error)
    }
}

const verifyUser = async(req, res, next) => {
    try {
      const result = await UserService.verifyAndRegisterUser(req.params.token) 
      res.status(STATUS_CODES.SUCCESS).json(result);
    } catch (error) {
      next(error); 
    }
}

const generateTokens = async(user) => {
  const accessToken = jwt.sign(
    { userId: user.userId, useremail: user.useremail, isActive: user.isActive },
    process.env.JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRATION } 
  );
  const refreshToken = jwt.sign(
    { userId: user.userId, useremail: user.useremail, isActive: user.isActive  },
    process.env.JWT_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRATION }
  );

  return { accessToken, refreshToken };
};

const loginUser = async(req, res, next) => {
  try {
    const {identifier, password} = req.body;
    const user = await UserService.getUsersByEmailOrUserName(identifier);
    if(!user){
      throw new AppError(MESSAGES.USER_NOT_FOUND, STATUS_CODES.NOT_FOUND)
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
      throw new AppError(MESSAGES.INVALID_CREDENTIALS, STATUS_CODES.UNAUTHORIZED);
    }

    //generate token(access token)
    const token = await generateTokens(user)

    //set user details in redis cache
    redisClient.SET(`user:${user.userId}`, JSON.stringify({ userId: user.userId, useremail: user.useremail, isActive: user.isActive }), {
      EX: 3600
    })

    res.setHeader('Authorization', `Bearer ${token.accessToken}`); //token set inside response header not in response
    // Set refresh token in HTTP cookie

    res.cookie("refreshToken", token.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: REFRESH_TOKEN_EXPIRATION
    });
    
    res.status(STATUS_CODES.SUCCESS).json({ message: 'Login successful' }); 
  
  } catch (error) {
    next(error); 
  }
}


const viewProfile = async(req, res , next) => {
  try {
    const {user} = req

    const userDetails = await UserService.getUsersById(user.userId);

    if(!userDetails){
      throw new AppError(MESSAGES.USER_NOT_FOUND, STATUS_CODES.NOT_FOUND)
    }

    res.status(STATUS_CODES.SUCCESS).json({
      message: 'User profile retrieved successfully',
      user: userDetails,
    });
  } catch (error) {
    next(error)
  }
}


const resetPassword = async(req, res, next) => {
  try {
    const {newPassword} = req.body;

    const user = req.user;

    //check in redis cache first for user
    let userDetails = await redisClient.get(`user:${user.userId}`);

    if(!userDetails){
      //if not in cache then check in db 
      userDetails = await UserService.getUsersById(user.userId);
      if(!userDetails){
        throw new AppError(MESSAGES.USER_NOT_FOUND, STATUS_CODES.NOT_FOUND);
      }
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    
    await UserService.resetUserPassword(user, newHashedPassword)

    res.json({ message: "Password has been reset successfully" });
  } catch (error) {
    next(error); 
  }
}

const refreshAccessToken = async(req, res, next) => {
  try {
    const {user} = req
    const refreshToken = req.cookies?.refreshToken;
    
    if (!refreshToken) {
        throw new AppError(MESSAGES.REFRESH_TOKEN_MISSING, STATUS_CODES.UNAUTHORIZED);
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    //verfiy with access token data if refresh token is valid
    if(user.userId !== decoded.userId ){
      throw new AppError(MESSAGES.INVALID_REFRESH_TOKEN, STATUS_CODES.FORBIDDEN);
    }

    const accessToken = jwt.sign(
        { userId: user.userId, useremail: user.useremail, isActive: user.isActive },
        process.env.JWT_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRATION }
    );

    res.setHeader('Authorization', `Bearer ${accessToken}`); //token set inside response header not in response

    res.status(STATUS_CODES.SUCCESS).json({ message: 'Access Token refreshed successfully' }); 
  } catch (error) {
    next(error)
  }
}


const logoutUser = async(req, res, next) => {
  try {
    const {user}  = req

    const userExists = await redisClient.exists(`user:${user.userId}`);

    if(!userExists){
      return res.status(400).json({ message: 'User already logged out' });
    }

    // Delete user data from Redis
    await redisClient.del(`user:${user.userId}`);

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      path: "/" 
    })

    res.status(STATUS_CODES.SUCCESS).json({ message: 'Logout successful' });
  } catch (error) {
    next(error)
  }
}

const updateUserProfile = async(req, res, next) => {
  try {
    const user = req.user;
    const newUserDetails = req.body

    //check in redis cache first for user
    let userDetails = await redisClient.get(`user:${user.userId}`);

    if(!userDetails){
      //if not in cache then check in db 
      userDetails = await UserService.getUsersById(user.userId);
      if(!userDetails){
        throw new AppError(MESSAGES.USER_NOT_FOUND, STATUS_CODES.NOT_FOUND);
      }
    }

    newUserDetails.userId = user.userId

    await UserService.updateUser(newUserDetails)
    redisClient.SET(`user:${user.userId}`, JSON.stringify({ userId: user.userId, useremail: newUserDetails.useremail, isActive: user.isActive }));

    res.status(STATUS_CODES.SUCCESS).json({
      message: 'Profile updated successfully', user: {
        ...newUserDetails,
        userId: user.userId
      }
    })

    
  } catch (error) {
    next(error)
  }
}

module.exports = { signUp, verifyUser, loginUser, resetPassword, refreshAccessToken, generateTokens, logoutUser, updateUserProfile, viewProfile };
