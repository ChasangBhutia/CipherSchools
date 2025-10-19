module.exports.successResponse = (res, statusCode, message, data) => {
  return res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data,
  });
};

module.exports.errorResponse = (
  res,
  statusCode,
  code,
  message,
  fields = []
) => {
  return res.status(statusCode).json({
    success: false,
    statusCode,
    error: {
      code,
      message,
      ...(fields.length > 0 && { fields }),
    },
  });
};
