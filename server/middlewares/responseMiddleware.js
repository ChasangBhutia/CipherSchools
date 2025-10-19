const { successResponse, errorResponse } = require("../utils/responseHandler");

module.exports.responseMiddleware = (req, res, next) => {
  res.success = (statusCode, message, data) =>
    successResponse(res, statusCode, message, data);
  res.error = (statusCode, code, fields, message) =>
    errorResponse(res, statusCode, code, fields, message);

  next();
};
