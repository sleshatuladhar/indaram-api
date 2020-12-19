const Router = require("express").Router;
const router = Router();
const aboutusService = require("../service/aboutus-service");
const httpResponse = require("../common/http-response");

router.get("/", (req, res) => {
  aboutusService
    .fetchAllAboutUs(req)
    .then(async data => {
      httpResponse.successHandler(res, data);
    })
    .catch(error => {
      httpResponse.errorHandler(res, error);
    });
});

router.get("/:pk", (req, res) => {
  aboutusService
    .fetchAboutUsByPk(req)
    .then(async data => {
      httpResponse.successHandler(res, data);
    })
    .catch(error => {
      httpResponse.errorHandler(res, error);
    });
});

router.post("/", (req, res) => {
  aboutusService
    .createAboutUs(req)
    .then(async data => {
      httpResponse.successHandler(res, data);
    })
    .catch(error => {
      httpResponse.errorHandler(res, error);
    });
});

router.put("/", (req, res) => {
  aboutusService
    .editAboutUs(req)
    .then(async data => {
      httpResponse.successHandler(res, data);
    })
    .catch(error => {
      httpResponse.errorHandler(res, error);
    });
});

router.delete("/:id", (req, res) => {
  aboutusService
    .deleteAboutUs(req)
    .then(async data => {
      httpResponse.successHandler(res, data);
    })
    .catch(error => {
      httpResponse.errorHandler(res, error);
    });
});

router.post("/change-visible", (req, res) => {
  aboutusService
    .updateVisible(req)
    .then(async data => {
      httpResponse.successHandler(res, data);
    })
    .catch(error => {
      httpResponse.errorHandler(res, error);
    });
});

module.exports = router;