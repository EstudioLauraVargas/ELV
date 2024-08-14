module.exports = (res, statusCode, data, message = '') => {
    res.status(statusCode).json({
      error: false,
      message,
      data
    });
  };
  