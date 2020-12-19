const Router = require('express').Router;
let router = Router();

const authController = require('./controller/auth-controller');
const aboutusController = require('./controller/aboutus-controller');

router.get("/", (req, res) => {
  res.json("This is the vitafy health api");
});

router.use('/auth', authController);
router.use('/aboutus', aboutusController);

module.exports = router;