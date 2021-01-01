const Sequelize = require('sequelize');
const conn = require('../common/mssql-connection');

const djangoContentType = conn.define('django_content_type', {
  id: {
    type: Sequelize.INTEGER,
    field: "id",
    autoIncrement: true,
    primaryKey: true
  },
  appLabel: {
    type: Sequelize.STRING,
    field: "app_label"
  },
  model: {
    type: Sequelize.STRING,
    field: 'model'
  },
}, {
  // timestamps: true,
  underscored: true,
});

module.exports = djangoContentType;