const Sequelize = require('sequelize');
const conn = require('../common/mssql-connection');
const authGroupPermissions = require('./auth-group-permissions');

const authGroup = conn.define('auth_group', {
  id: {
    type: Sequelize.INTEGER,
    field: "id",
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    field: 'name'
  },
}, {
  // timestamps: true,
  underscored: true,
});

authGroup.hasMany(authGroupPermissions, { as: 'authGroupPermissions', foreignKey: 'groupId', sourceKey: 'id' });
authGroupPermissions.belongsTo(authGroup, { as: 'authGroup', foreignKey: 'groupId', targetKey: 'id' });

module.exports = authGroup;