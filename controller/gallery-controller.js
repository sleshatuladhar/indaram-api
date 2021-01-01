const Router = require("express").Router;
const router = Router();
const galleryService = require("../service/gallery-service");
const httpResponse = require("../common/http-response");

router.get("/", (req, res) => {
  galleryService
    .fetchAllGallery(req)
    .then(async data => {
      httpResponse.successHandler(res, data);
    })
    .catch(error => {
      httpResponse.errorHandler(res, error);
    });
});

router.get("/public", (req, res) => {
  galleryService
    .fetchGalleryForPublic(req)
    .then(async data => {
      httpResponse.successHandler(res, data);
    })
    .catch(error => {
      httpResponse.errorHandler(res, error);
    });
});

router.get("/:pk", (req, res) => {
  galleryService
    .fetchGalleryByPk(req)
    .then(async data => {
      httpResponse.successHandler(res, data);
    })
    .catch(error => {
      httpResponse.errorHandler(res, error);
    });
});

router.post("/", (req, res) => {
  galleryService
    .createGallery(req)
    .then(async data => {
      httpResponse.successHandler(res, data);
    })
    .catch(error => {
      httpResponse.errorHandler(res, error);
    });
});

router.put("/", (req, res) => {
  galleryService
    .editGallery(req)
    .then(async data => {
      httpResponse.successHandler(res, data);
    })
    .catch(error => {
      httpResponse.errorHandler(res, error);
    });
});

router.delete("/:id", (req, res) => {
  galleryService
    .deleteGallery(req)
    .then(async data => {
      httpResponse.successHandler(res, data);
    })
    .catch(error => {
      httpResponse.errorHandler(res, error);
    });
});

router.post("/change-visible", (req, res) => {
  galleryService
    .updateVisible(req)
    .then(async data => {
      httpResponse.successHandler(res, data);
    })
    .catch(error => {
      httpResponse.errorHandler(res, error);
    });
});

module.exports = router;