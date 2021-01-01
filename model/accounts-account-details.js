const Sequelize = require('sequelize');
const conn = require('../common/mssql-connection');
const accountsAccount = require('./accounts-account');

const accountsAccountDetails = conn.define('accounts_account_details', {
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
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name'
  },
  lastName: {
    type: Sequelize.STRING,
    field: 'last_name'
  },
  gender: {
    type: Sequelize.STRING,
    field: 'gender'
  },
  dob: {
    type: Sequelize.STRING,
    field: 'dob'
  },
  avatar: {
    type: Sequelize.STRING,
    field: 'avatar'
  },
  contactNumber: {
    type: Sequelize.STRING,
    field: 'contact_number'
  }
}, {
  // timestamps: true,
  underscored: true,
  // createdAt: 'created_at',
  // updatedAt: 'updated_at'
});

accountsAccount.hasOne(accountsAccountDetails, { as: 'accountsAccountDetails', foreignKey: 'accountId', sourceKey: 'id' });

module.exports = accountsAccountDetails;