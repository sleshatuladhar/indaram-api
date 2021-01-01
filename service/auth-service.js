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
  //#endregion

  //#region Services
  const utilityService = require('../util/utility-service');
  const userService = require('./user-service');
  //#endregion

  //#region Functions
  const register = (req) => {
    return new Promise(async (resolve, reject) => {
      let t = await conn.transaction();
      try {
        //#region Creating new user
        let accountSaved = await userService
          .createUser(req)
          .catch(error => {
            t.rollback();
            return reject(error);
          });
        //#endregion

        await t.commit();
        resolve(accountSaved);
      } catch (error) {
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