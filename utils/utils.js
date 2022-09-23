const formatResponse = (res, statusCode, payload) =>
  res.status(statusCode).json(payload);

module.exports = {
  formatResponse,
};
