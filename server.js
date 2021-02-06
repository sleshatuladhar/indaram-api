const route = require('./routes.js');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PORT, NODE_ENV } = require('./config');
const utilityService = require('./util/utility-service');

const app = express();
let port = PORT || process.env.PORT || config.node_port;

// const SEQUELIZE_CONF=require('./common/mssql-connection');
// SEQUELIZE_CONF.sync();

// app.use(cors({
//   origin: '*',
//   credentials: true
// }));
app.use(cors());
// app.options('*', cors());

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   // utilityService.setRequestHeader();
//   utilityService.verifyDomain(req, res, next);
// });

app.use(
  bodyParser.json({
    limit: "50mb"
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 500000,
    extended: true
  })
);

app.get('/', (req, res) => {
  res.send("Hello World");
});

app.use('/api', route);

if (NODE_ENV != "production") {
  console.log("PORT NUMBER:", port);
}
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});