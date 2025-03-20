const { STATUS_CODES } = require('../../../../constants/constants');
const AppError = require('../../../../utils/appErrors');
const { addResource } = require('../service/createResource');
const { getResourceData } = require('../service/getResource');

const createResource = async (req, res, next) => {
  try {
    const resource = req.body;
    const existingResource = await getResourceData(resource.resourceName);

    if (existingResource) {
      throw new AppError('Resource already exists', STATUS_CODES.CONFLICT);
    }

    const resourceData = await addResource(resource);
    res.status(STATUS_CODES.CREATED).json({
      message: 'Resource create successfully',
      Resource: resourceData,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createResource;
