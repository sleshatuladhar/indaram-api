const Sequelize = require('sequelize');
const conn = require('../common/mssql-connection');

const services = conn.define('services', {
  id: {
    type: Sequelize.INTEGER,
    field: "id",
    autoIncrement: true,
    primaryKey: true
  },
  serviceImage: {
    type: Sequelize.STRING,
    field: "service_image"
  },
  title: {
    type: Sequelize.STRING,
    field: 'title'
  },
  description: {
    type: Sequelize.STRING,
    field: 'description'
  },
  visible: {
    type: Sequelize.BOOLEAN,
    field: 'visible',
    defaultValue: false
  },
  createdAt: {
    type: Sequelize.DATE,
    field: 'created_at'
  },
  updatedAt: {
    type: Sequelize.DATE,
    field: 'updated_at'
  }
}, {
  timestamps: true,
  underscored: true,
  // createdAt: 'created_at',
  // updatedAt: 'updated_at'
});

module.exports = services;