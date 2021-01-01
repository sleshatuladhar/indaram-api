const Sequelize = require('sequelize');
const conn = require('../common/mssql-connection');

const accountsAccountGroups = conn.define('accounts_account_groups', {
  id: {
    type: Sequelize.INTEGER,
    field: "id",
    autoIncrement: true,
    primaryKey: true
  },
  accountId: {
    type: Sequelize.INTEGER,
    field: 'account_id'
  },
  groupId: {
    type: Sequelize.INTEGER,
    field: 'group_id'
  }
}, {
  // timestamps: true,
  underscored: true,
  // createdAt: 'created_at',
  // updatedAt: 'updated_at'
});

module.exports = accountsAccountGroups;