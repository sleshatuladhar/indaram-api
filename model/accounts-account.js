const Sequelize = require('sequelize');
const conn = require('../common/mssql-connection');
const bcrypt = require('bcrypt');

const accountsAccount = conn.define('accounts_account', {
  id: {
    type: Sequelize.INTEGER,
    field: "id",
    autoIncrement: true,
    primaryKey: true
  },
  password: {
    type: Sequelize.STRING,
    field: "password"
  },
  lastLogin: {
    type: Sequelize.DATE,
    field: 'last_login'
  },
  username: {
    type: Sequelize.STRING,
    field: 'username'
  },
  email: {
    type: Sequelize.STRING,
    field: 'email'
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    field: 'is_active',
    defaultValue: true
  },
  dateJoined: {
    type: Sequelize.DATE,
    field: 'date_joined'
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

accountsAccount.beforeCreate((user, options) => {
  user.dateJoined = new Date().toISOString();
  if (user.password) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) reject(err);
        user.password = hash;
        resolve(true);
      })
    })
  }
})
module.exports = accountsAccount;