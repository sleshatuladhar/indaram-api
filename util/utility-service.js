const utilityService = (() => {
  const jwt = require('jsonwebtoken');
  const commonConstant = require('../constant/common-constant');
  const httpResponse = require('../common/http-response');

  const decodeToken = (req) => {
    return new Promise((resolve, reject) => {
      let token = req.headers['authorization'];
      token = token.replace('Bearer ', '');
      jwt.verify(token, "secret", (err, decoded) => {
        if (err) {
          resolve({ success: false })
        }
        resolve(decoded)
      })
    });
  }

  const verifyDomain = (req, res, next) => {
    let allowedDomains = commonConstant.ALLOWED_DOMAINS;
    let ip = req.header('X-Real-IP') || req.connection.remoteAddress;
    error = {
      data: null,
      statusCode: 401,
      message: 'Unauthorized Access'
    }
    if (allowedDomains.includes(req.headers.origin) || allowedDomains.includes(req.headers.requestsource) || allowedDomains.includes(ip) || allowedDomains.includes(req.headers.requestapp))
      next();
    else
      httpResponse.unAuthorized(res, error);
  }

  return {
    decodeToken,
    verifyDomain
  }
})();

module.exports = utilityService;