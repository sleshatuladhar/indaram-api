const Sequelize = require('sequelize');
const conn = require('../common/mssql-connection');

const authPermission = conn.define('auth_permission', {
  id: {
    type: Sequelize.INTEGER,
    field: "id",
    autoIncrement: true,
    primaryKey: true
  },
  contentTypeId: {
    type: Sequelize.INTEGER,
    field: "content_type_id"
  },
  codename: {
    type: Sequelize.STRING,
    field: 'codename'
  },
  name: {
    type: Sequelize.STRING,
    field: 'name'
  },
}, {
  timestamps: false,
  underscored: true,
});

module.exports = authPermission;