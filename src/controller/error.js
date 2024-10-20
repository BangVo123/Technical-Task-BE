module.exports = (error, req, res, next) => {
  const statusCode = error.statusCode || 400;

  console.log(error);

  res
    .status(statusCode)
    .json({ statusCode: statusCode, message: error.message });
};
