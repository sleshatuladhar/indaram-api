const Router = require('express').Router;
let router = Router();

const authController = require('./controller/auth-controller');
const aboutusController = require('./controller/aboutus-controller');
const userController = require('./controller/user-controller');
const servicesController = require('./controller/services-controller');
const galleryController = require('./controller/gallery-controller');
const faqController = require('./controller/faq-controller');

router.get("/", (req, res) => {
  res.json("This is the vitafy health api");
});

router.use('/auth', authController);
router.use('/aboutus', aboutusController);
router.use('/user', userController);
router.use('/services', servicesController);
router.use('/gallery', galleryController);
router.use('/faq', faqController);

module.exports = router;