const Sequelize = require('sequelize');
const conn = require('../common/mssql-connection');

const accountsAccountUserPermissions = conn.define('accounts_account_user_permissions', {
  id: {
    type: Sequelize.INTEGER,
    field: "id",
    autoIncrement: true,
    primaryKey: true
  },
  accountId: {
    type: Sequelize.INTEGER,
    field: "account_id"
  },
  permissionId: {
    type: Sequelize.INTEGER,
    field: "permission_id"
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
  timestamps: false,
  underscored: true,
  // createdAt: 'created_at',
  // updatedAt: 'updated_at'
});

module.exports = accountsAccountUserPermissions;