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
}, {
  // timestamps: true,
  underscored: true,
  // createdAt: 'created_at',
  // updatedAt: 'updated_at'
});

module.exports = accountsAccountUserPermissions;