const AppError = require("../../../../utils/appErrors");

const validate = async(schema, data) => {
    try {
      await schema.validate(data, { abortEarly: true }); // Validate the request body
      return
    } catch (err) {
        const errors = {
            path: err.path,
            message: err.message,
        };

        throw new AppError('Validation failed', 400, errors);
    }
  };


module.exports = validate;