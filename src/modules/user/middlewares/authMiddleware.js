const jwt = require('jsonwebtoken');
const AppError = require('../../../../utils/appErrors');
const { MESSAGES, STATUS_CODES } = require('../../../../constants/constants');

const verifyAccessToken = async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
    
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AppError(MESSAGES.UNAUTHORIZED_ACCESS, STATUS_CODES.UNAUTHORIZED);
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decoded; // Attach user data to request
        next();
    } catch (error) {
        next(error)
    }
};


module.exports = {verifyAccessToken};
