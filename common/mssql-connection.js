const Sequelize = require('sequelize');
const {
  MSSQL_DATABASE,
  MSSQL_USER,
  MSSQL_PASSWORD,
  MSSQL_HOST,
  MSSQL_MAXPOOL,
  MSSQL_MINPOOL,
  MSSQL_IDLETIMEOUTMILLIS,
  PORT
} = require('../config');

Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  date = this._applyTimezone(date, options);
  return date.format('YYYY-MM-DD HH:mm:ss.SSS');
}

// const SEQUELIZE_CONF = new Sequelize(MSSQL_DATABASE, MSSQL_USER, MSSQL_PASSWORD, {
//   host: MSSQL_HOST,
//   dialect: 'mssql',
//   define: {
//     freezeTableName: true,
//     timestamps: false
//   },
//   pool: {
//     max: +MSSQL_MAXPOOL,//+ has been added to fix the issue: max must be an integer > 0
//     min: +MSSQL_MINPOOL,
//     idle: MSSQL_IDLETIMEOUTMILLIS
//   }
// })

const SEQUELIZE_CONF = new Sequelize({
  port: PORT,
  // port: 3306,
  // port: 2083,
  database: MSSQL_DATABASE || process.env.MSSQL_DATABASE,
  username: MSSQL_USER || process.env.MSSQL_USER,
  host: MSSQL_HOST || process.env.MSSQL_HOST,
  password: MSSQL_PASSWORD || process.env.MSSQL_PASSWORD,
  dialect: 'mysql',
  // dialect: 'mariadb',
  // operatorsAliases: false,
  define: {
    freezeTableName: true,
    timestamps: false
  },
  pool: {
    max: +MSSQL_MAXPOOL || +process.env.MSSQL_MAXPOOL,//+ has been added to fix the issue: max must be an integer > 0
    min: +MSSQL_MINPOOL || +process.env.MSSQL_MINPOOL,
    idle: MSSQL_IDLETIMEOUTMILLIS || process.env.MSSQL_IDLETIMEOUTMILLIS
  }
})

// SEQUELIZE_CONF
//   .authenticate()
//   // .connect()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

// const mariadb = require('mariadb');

// mariadb.createConnection({ host: MSSQL_HOST, user: MSSQL_USER, password: MSSQL_PASSWORD })
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

// const mariadb = require('mariadb');
// const pool = mariadb.createPool({host: MSSQL_HOST, user: MSSQL_USER, connectionLimit: 5});

// async function asyncFunction() {
//   let conn;
//   try {

// 	conn = await pool.getConnection();
// 	const rows = await conn.query("SELECT 1 as val");
// 	// rows: [ {val: 1}, meta: ... ]

//   } catch (err) {
// 	throw err;
//   } finally {
// 	if (conn) conn.release(); //release to pool
//   }
// }

// asyncFunction()

// var mysql = require('mysql');

// var con = mysql.createConnection({
//   user: MSSQL_USER,
//   host: MSSQL_HOST,
//   // host: 'localhost',
//   password: MSSQL_PASSWORD,
//   database: MSSQL_DATABASE,
//   port: 2083
// });

// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// var pool = mysql.createPool({
//   connectionLimit: 100,
//   user: MSSQL_USER,
//   host: MSSQL_HOST,
//   // host: 'localhost',
//   password: MSSQL_PASSWORD,
//   database: MSSQL_DATABASE,
//   port: 2083
// });

// pool.getConnection(function (err, conn) {
//   if (err) {
//     return callback(err);
//   }
//   callback(err, conn);
// });

module.exports = SEQUELIZE_CONF;