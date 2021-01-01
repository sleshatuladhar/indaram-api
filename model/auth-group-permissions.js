const Sequelize = require('sequelize');
const conn = require('../common/mssql-connection');

const authGroupPermissions = conn.define('auth_group_permissions', {
  id: {
    type: Sequelize.INTEGER,
    field: "id",
    autoIncrement: true,
    primaryKey: true
  },
  groupId: {
    type: Sequelize.INTEGER,
    field: 'group_id'
  },
  permissionId: {
    type: Sequelize.INTEGER,
    field: 'permission_id'
  },
}, {
  // timestamps: true,
  underscored: true,
});

module.exports = authGroupPermissions;