const Sequelize = require('sequelize');
const conn = require('../common/mssql-connection');

const faq = conn.define('faq', {
  id: {
    type: Sequelize.INTEGER,
    field: "id",
    autoIncrement: true,
    primaryKey: true
  },
  section: {
    type: Sequelize.STRING,
    field: "section"
  },
  question: {
    type: Sequelize.STRING,
    field: 'question'
  },
  answer: {
    type: Sequelize.STRING,
    field: 'answer'
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

module.exports = faq;