const authService = (() => {
  //#region Plugins
  const conn = require('../common/mssql-connection');
  const bcrypt = require('bcrypt');
  const httpStatus = require('http-status-codes');
  const generateToken = require('../middlewares/token').generateToken;
  const Op = require('sequelize').Op;
  //#endregion

  //#region Models
  const accountsAccount = require('../model/accounts-account');
  const authPermission = require('../model/auth-permission');
  const accountsAccountUserPermissions = require('../model/accounts-account-user-permissions');
  //#endregion

  //#region Services
  const utilityService = require('../util/utility-service');
  //#endregion

  //#region Functions
  const register = (req) => {
    return new Promise(async (resolve, reject) => {
      let t = await conn.transaction();
      let body = req.body;
      try {
        //#region Checking if email exists
        let isEmailExist = await accountsAccount
          .findOne({ where: { email: body.email } });
        if (isEmailExist) {
          await t.rollback();
          return reject({
            message: `User with ${body.email} already exists`
          });
        }
        //#endregion

        //#region Saving new account
        let account_saved = await accountsAccount
          .create(body, { transaction: t })
          .then(response => {
            return response;
          }).catch(error => {
            console.log('error', error);
            t.rollback();
            return reject(error);
          });
        //#endregion

        //#region Assign auth permissions to account
        await assignPermissions(account_saved, t);
        //#endregion

        await t.commit();
        resolve(account_saved);
      } catch (error) {
        console.log(error);
        await t.rollback();
        return reject(error);
      }
    })
  }

  const assignPermissions = (account = {}, transaction = null) => {
    return new Promise(async (resolve, reject) => {
      let t = transaction ? transaction : await conn.transaction();
      let resolveData;
      try {
        let accountPermissions = [];
        if (account && account.isSuperuser) {
          let authPermissionList = await authPermission
            .findAll();
          accountPermissions = authPermissionList.map(x => {
            return {
              permissionId: x.id,
              accountId: account.id
            }
          })
          resolveData = await accountsAccountUserPermissions
            .bulkCreate(accountPermissions, { transaction: t });
        }
        !transaction && t.commit();
        resolve(resolveData);
      } catch (error) {
        console.log(error);
        await t.rollback();
        return reject(error);
      }
    })
  }

  const signIn = (req) => {
    return new Promise((resolve, reject) => {
      let body = req.body;

      //#region Find account
      accountsAccount.findOne({
        where: {
          [Op.or]: [
            { username: body.username },
            { email: body.username }
          ]
        }
      }).then(account => {
        if (account) {
          return bcrypt
            .compare(body.password, account.password)
            .then(async isPasswordValid => {
              if (!isPasswordValid) {
                return reject({
                  statusCode: httpStatus.UNAUTHORIZED,
                  message: 'Invalid username or password.',
                })
              } else {
                let updateBody = { ...account.dataValues };
                updateBody.lastLogin = new Date().toISOString();
                await accountsAccount.update(updateBody, { where: { id: account.id } });
                let response = {
                  token: generateToken(updateBody, body.rememberMe)
                }
                return resolve(response);
              }
            })
        } else {
          return reject({
            statusCode: httpStatus.UNAUTHORIZED,
            message: 'Email does not exist. Please contact administrator'
          });
        }
      }).catch(error => {
        console.log('error', error);
        return reject(error);
      })
      //#endregion
    })
  }

  const verifyToken = (req) => {
    return new Promise(async (resolve, reject) => {
      let decodedToken = await utilityService.decodeToken(req);
      if (!decodedToken) {
        reject('Could not verify token');
      } else {
        resolve(decodedToken);
      }
    })
  }

  // assignPermissions({ isSuperuser: true });
  //#endregion

  //#region Returns
  return {
    register,
    signIn,
    verifyToken
  }
  //#endregion
})();

module.exports = authService;