const Sequelize = require('sequelize');
const conn = require('../common/mssql-connection');

const gallery = conn.define('gallery_gallery', {
  id: {
    type: Sequelize.INTEGER,
    field: "id",
    autoIncrement: true,
    primaryKey: true
  },
  galleryImage: {
    type: Sequelize.STRING,
    field: "gallery_image"
  },
  title: {
    type: Sequelize.STRING,
    field: 'title'
  },
  shortDescription: {
    type: Sequelize.STRING,
    field: 'short_description'
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

module.exports = gallery;