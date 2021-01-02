const Router = require("express").Router;
const router = Router();
const faqService = require("../service/faq-service");
const httpResponse = require("../common/http-response");

router.get("/", (req, res) => {
  faqService
    .fetchAllFAQ(req)
    .then(async data => {
      httpResponse.successHandler(res, data);
    })
    .catch(error => {
      httpResponse.errorHandler(res, error);
    });
});

router.get("/public", (req, res) => {
  faqService
    .fetchFAQForPublic(req)
    .then(async data => {
      httpResponse.successHandler(res, data);
    })
    .catch(error => {
      httpResponse.errorHandler(res, error);
    });
});

router.get("/:pk", (req, res) => {
  faqService
    .fetchFAQByPk(req)
    .then(async data => {
      httpResponse.successHandler(res, data);
    })
    .catch(error => {
      httpResponse.errorHandler(res, error);
    });
});

router.post("/", (req, res) => {
  faqService
    .createFAQ(req)
    .then(async data => {
      httpResponse.successHandler(res, data);
    })
    .catch(error => {
      httpResponse.errorHandler(res, error);
    });
});

router.put("/", (req, res) => {
  faqService
    .editFAQ(req)
    .then(async data => {
      httpResponse.successHandler(res, data);
    })
    .catch(error => {
      httpResponse.errorHandler(res, error);
    });
});

router.delete("/:id", (req, res) => {
  faqService
    .deleteFAQ(req)
    .then(async data => {
      httpResponse.successHandler(res, data);
    })
    .catch(error => {
      httpResponse.errorHandler(res, error);
    });
});

router.post("/change-visible", (req, res) => {
  faqService
    .updateVisible(req)
    .then(async data => {
      httpResponse.successHandler(res, data);
    })
    .catch(error => {
      httpResponse.errorHandler(res, error);
    });
});

router.get("/sections/search", (req, res) => {
  faqService
    .searchSections(req)
    .then(async data => {
      httpResponse.successHandler(res, data);
    })
    .catch(error => {
      httpResponse.errorHandler(res, error);
    });
});

module.exports = router;