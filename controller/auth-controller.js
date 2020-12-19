const Router = require("express").Router;
const router = Router();
const authService = require("../service/auth-service");
const httpResponse = require("../common/http-response");

router.post("/login", (req, res) => {
  authService
    .signIn(req)
    .then(async data => {
      httpResponse.successHandler(res, data);
    })
    .catch(error => {
      httpResponse.errorHandler(res, error);
    });
});

router.post("/register", (req, res) => {
  authService
    .register(req)
    .then(async data => {
      httpResponse.successHandler(res, data);
    })
    .catch(error => {
      httpResponse.errorHandler(res, error);
    });
});

router.get("/verify-token", (req, res) => {
  authService
    .verifyToken(req)
    .then(async data => {
      httpResponse.successHandler(res, data);
    })
    .catch(error => {
      httpResponse.errorHandler(res, error);
    });
});


module.exports = router;