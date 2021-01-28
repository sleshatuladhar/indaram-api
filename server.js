const route = require('./routes.js');

const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const { PORT, NODE_ENV } = require('./config');
const utilityService = require('./util/utility-service');

const app = express();
let port = PORT || config.node_port;

app.use(cors());

app.use((req, res, next) => {
  utilityService.setRequestHeader();
  utilityService.verifyDomain(req, res, next);
});

app.use(
  express.json({
    limit: "50mb"
  })
);

app.use(
  express.urlencoded({
    limit: "50mb",
    parameterLimit: 500000,
    extended: true
  })
);

app.use('/api', route);

if (NODE_ENV != "production") {
  console.log("PORT NUMBER:", port);
}
app.listen(port);