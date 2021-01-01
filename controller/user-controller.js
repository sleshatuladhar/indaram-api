const Router = require("express").Router;
const router = Router();
const userService = require("../service/user-service");
const httpResponse = require("../common/http-response");

router.get("/", (req, res) => {
  userService
    .fetchAllUser(req)
    .then(async data => {
      httpResponse.successHandler(res, data);
    })
    .catch(error => {
      httpResponse.errorHandler(res, error);
    });
});

router.get("/:pk", (req, res) => {
  userService
    .fetchUserByPk(req)
    .then(async data => {
      httpResponse.successHandler(res, data);
    })
    .catch(error => {
      httpResponse.errorHandler(res, error);
    });
});

router.post("/", (req, res) => {
  userService
    .createUser(req)
    .then(async data => {
      httpResponse.successHandler(res, data);
    })
    .catch(error => {
      httpResponse.errorHandler(res, error);
    });
});

router.put("/", (req, res) => {
  userService
    .editUser(req)
    .then(async data => {
      httpResponse.successHandler(res, data);
    })
    .catch(error => {
      httpResponse.errorHandler(res, error);
    });
});

router.delete("/:id", (req, res) => {
  userService
    .deleteUser(req)
    .then(async data => {
      httpResponse.successHandler(res, data);
    })
    .catch(error => {
      httpResponse.errorHandler(res, error);
    });
});

module.exports = router;