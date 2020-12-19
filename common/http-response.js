const httpStatus = require('http-status-codes');

responseBody = (status, data, message=null) => {
  return {
    status: status,
    data: data,
    message:message
  };
};

const httpResponse = {
  errorHandler(response, error, message = "Error occured"){
    if (process.env.NODE_ENV != "production"){
      console.log(`---***--- ${message} ---***---\n`, error);
    }
    response.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
      .send(responseBody("error", null, error.message || error))
  },
  successHandler(response, data, message){
    response.status(httpStatus.OK).send(responseBody("success", data, message));
  },
  unAuthorized(response, error) {
    response
      .status(error.statusCode || HttpStatus.UNAUTHORIZED)
      .send(responseBody("unauthorized", null, error.message || error));
  }
};

module.exports = httpResponse;