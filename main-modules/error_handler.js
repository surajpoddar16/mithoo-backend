function internalServerError(res, error) {
  res.statusCode = 500;
  res.send({
    error: error,
    status: false
  });
}

function notFoundError(res, msg) {
  res.statusCode = 404;
  res.send({
    error: {
      message: msg
    },
    status: false
  });
}

function unauthorizedError(res, msg) {
  res.statusCode = 403;
  res.send({
    error: {
      message: msg
    },
    status: false
  });
}

function emailError(error) {
  if (error) {
    console.log(error);
  }
}

function conflictError(res, msg) {
  res.statusCode = 409;
  res.send({
    error: {
      message: msg
    },
    status: false
  });
}

function invalidRequestError(res, msg) {
  res.statusCode = 400;
  res.send({
    error: {
      message: msg
    },
    status: false
  });
}

module.exports = {
  internalServerError: internalServerError,
  notFoundError: notFoundError,
  unauthorizedError: unauthorizedError,
  emailError: emailError,
  conflictError: conflictError,
  invalidRequestError: invalidRequestError
};
