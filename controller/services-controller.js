const Router = require("express").Router;
const router = Router();
const servicesService = require("../service/services-service");
const httpResponse = require("../common/http-response");

router.get("/", (req, res) => {
  servicesService
    .fetchAllServices(req)
    .then(async data => {
      httpResponse.successHandler(res, data);
    })
    .catch(error => {
      httpResponse.errorHandler(res, error);
    });
});

router.get("/public", (req, res) => {
  servicesService
    .fetchServicesForPublic(req)
    .then(async data => {
      httpResponse.successHandler(res, data);
    })
    .catch(error => {
      httpResponse.errorHandler(res, error);
    });
});

router.get("/:pk", (req, res) => {
  servicesService
    .fetchServicesByPk(req)
    .then(async data => {
      httpResponse.successHandler(res, data);
    })
    .catch(error => {
      httpResponse.errorHandler(res, error);
    });
});

router.post("/", (req, res) => {
  servicesService
    .createServices(req)
    .then(async data => {
      httpResponse.successHandler(res, data);
    })
    .catch(error => {
      httpResponse.errorHandler(res, error);
    });
});

router.put("/", (req, res) => {
  servicesService
    .editServices(req)
    .then(async data => {
      httpResponse.successHandler(res, data);
    })
    .catch(error => {
      httpResponse.errorHandler(res, error);
    });
});

router.delete("/:id", (req, res) => {
  servicesService
    .deleteServices(req)
    .then(async data => {
      httpResponse.successHandler(res, data);
    })
    .catch(error => {
      httpResponse.errorHandler(res, error);
    });
});

router.post("/change-visible", (req, res) => {
  servicesService
    .updateVisible(req)
    .then(async data => {
      httpResponse.successHandler(res, data);
    })
    .catch(error => {
      httpResponse.errorHandler(res, error);
    });
});

module.exports = router;