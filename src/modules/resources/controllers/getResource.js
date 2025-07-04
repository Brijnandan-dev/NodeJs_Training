const { STATUS_CODES, MESSAGES } = require('../../../../constants/constants');
const AppError = require('../../../../utils/appErrors');
const { getResourceData } = require('../service/getResource');

const getResource = async (req, res, next) => {
  try {
    const { identifier } = req.body;

    const resourceDetails = await getResourceData(identifier);

    if (!resourceDetails) {
      throw new AppError(MESSAGES.RESOURCE_NOT_FOUND, STATUS_CODES.NOT_FOUND);
    }

    res.status(STATUS_CODES.SUCCESS).json({
      message: 'Resource retrieved successfully',
      resource: resourceDetails,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getResource;
