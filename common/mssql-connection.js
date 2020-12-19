const Sequelize = require('sequelize');
const {
  MSSQL_DATABASE,
  MSSQL_USER,
  MSSQL_PASSWORD,
  MSSQL_HOST,
  MSSQL_MAXPOOL,
  MSSQL_MINPOOL,
  MSSQL_IDLETIMEOUTMILLIS
} = require('../config');

Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  date = this._applyTimezone(date, options);
  return date.format('YYYY-MM-DD HH:mm:ss.SSS');
}

const SEQUELIZE_CONF = new Sequelize(MSSQL_DATABASE, MSSQL_USER, MSSQL_PASSWORD, {
  host: MSSQL_HOST,
  dialect: 'mssql',
  dialectOptions: {
    options:
    {
      useUTC: true
    }
  },
  define: {
    freezeTableName: true,
    timestamps: false
  },
  pool: {
    max: +MSSQL_MAXPOOL,//+ has been added to fix the issue: max must be an integer > 0
    min: +MSSQL_MINPOOL,
    idle: MSSQL_IDLETIMEOUTMILLIS
  }
})

module.exports = SEQUELIZE_CONF;