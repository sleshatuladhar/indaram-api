const userService = (() => {
  //#region Plugins
  const conn = require('../common/mssql-connection');
  const Op = require('sequelize').Op;
  //#endregion

  //#region Models
  const accountsAccount = require('../model/accounts-account');
  const accountsAccountGroups = require('../model/accounts-account-groups');
  const accountsAccountDetails = require('../model/accounts-account-details');
  const authGroup = require('../model/auth-group');
  const accountsAccountUserPermissions = require('../model/accounts-account-user-permissions');
  //#endregion

  //#region Services
  const authGroupPermissionsService = require('../service/auth-group-permissions-service');
  //#endregion

  //#region Functions
  const defaultInclude = () => {
    return {
      include: [
        {
          model: accountsAccountDetails,
          as: 'accountsAccountDetails',
          attributes: {
            exclude: ['id', 'accountId']
          }
        }
      ]
    }
  }

  const fetchAllUser = (req) => {
    return new Promise(async (resolve, reject) => {
      let include = defaultInclude();
      accountsAccount.findAndCountAll(include)
        // accountsAccount.findAll()
        .then(response => {
          const res = {
            rows: mapData(response.rows),
            count: response.count
          }
          resolve(res);
        }).catch(error => {
          console.log(error);
          return reject(error);
        })
    })
  }

  const fetchUserByPk = (req) => {
    return new Promise(async (resolve, reject) => {
      const pk = req.params.pk;
      let include = defaultInclude();
      accountsAccount.findByPk(pk, include)
        .then(response => {
          if (response) {
            const res = mapData([response]);
            resolve(res[0]);
          } else {
            resolve(null);
          }
        }).catch(error => {
          console.log(error);
          return reject(error);
        })
    })
  }

  const createUser = (req, transaction = null) => {
    return new Promise(async (resolve, reject) => {
      let t = transaction ? transaction : await conn.transaction();
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
        let accountSaved = await accountsAccount
          .create(body, { transaction: t })
          .then(response => {
            return response;
          }).catch(error => {
            console.log('error', error);
            t.rollback();
            return reject(error);
          });
        //#endregion

        //#region Saving new account details
        let accountDetailsSaved = await accountsAccountDetails
          .create({ ...body, accountId: accountSaved.id }, { transaction: t })
          .then(response => {
            return response;
          }).catch(error => {
            console.log('error', error);
            t.rollback();
            return reject(error);
          });
        //#endregion

        //#region Saving new account group
        let authGroupData = await authGroup.findOne({
          where: { name: body.group ? body.group : 'User' }
        })
        let accountGroupData = {
          accountId: accountSaved.id,
          groupId: authGroupData.id
        };
        let accountGroupSaved = await accountsAccountGroups
          .create(accountGroupData, { transaction: t })
          .then(response => {
            return response;
          }).catch(error => {
            t.rollback();
            return reject(error);
          });
        //#endregion

        //#region Fetch auth permissions for account according to group
        let authGroupPermissionsData = await authGroupPermissionsService
          .fetchAuthGroupPermissionsByGroupId({
            body: {
              groupId: authGroupData.id
            }
          }, t);
        //#endregion

        //#region Saving permissions for account
        let accountUserPermissionsData = await assignAccountUserPermissions(accountSaved, authGroupPermissionsData, t);
        //#endregion

        !transaction && await t.commit();
        resolve(accountSaved);
      } catch (error) {
        console.log(error);
        await t.rollback();
        return reject(error);
      }
    })
  }

  const assignAccountUserPermissions = (account = {}, authGroupPermissionsList = [], transaction = null) => {
    return new Promise(async (resolve, reject) => {
      let t = transaction ? transaction : await conn.transaction();
      let resolveData;
      try {
        accountUserPermissions = authGroupPermissionsList.map(x => {
          return {
            permissionId: x.permissionId,
            accountId: account.id
          }
        })
        resolveData = await accountsAccountUserPermissions
          .bulkCreate(accountUserPermissions, { transaction: t });

        !transaction && t.commit();
        resolve(resolveData);
      } catch (error) {
        console.log(error);
        !transaction && await t.rollback();
        return reject(error);
      }
    })
  }

  const editUser = (req, transaction = null) => {
    return new Promise(async (resolve, reject) => {
      let t = transaction ? transaction : await conn.transaction();
      let body = req.body;
      let { id, ...rest } = body;
      try {
        let existingAccountDetail = await accountsAccountDetails.findOne({ where: { accountId: id } });
        return Promise.all([
          accountsAccount.update(body, {
            where: { id: body.id },
            transaction: t
          }),
          existingAccountDetail && existingAccountDetail.id ?
            accountsAccountDetails.update({ ...rest, accountId: id }, {
              where: { id: existingAccountDetail.id },
              transaction: t
            })
            : accountsAccountDetails.create({ ...rest, accountId: id }, { transaction: t })
        ]).then(response => {
          !transaction && t.commit();
          resolve(response);
        }).catch(error => {
          !transaction && t.rollback();
          return reject(error);
        })
      } catch (error) {
        return reject(error);
      }
    })
  }

  const deleteUser = (req) => {
    return new Promise(async (resolve, reject) => {
      let id = req.params.id;
      let t = await conn.transaction();
      try {
        return Promise.all([
          accountsAccountDetails.destroy({
            where: { accountId: id },
            transaction: t
          }),
          accountsAccountGroups.destroy({
            where: { accountId: id },
            transaction: t
          }),
          accountsAccountUserPermissions.destroy({
            where: { accountId: id },
            transaction: t
          }),
          accountsAccount.destroy({
            where: { id },
            transaction: t
          }),
        ]).then(response => {
          t.commit();
          resolve(response);
        }).catch(error => {
          t.rollback();
          return reject(error);
        })
      } catch (error) {
        return reject(error);
      }
    })
  }

  const mapData = (rawList) => {
    return rawList.map(item => {
      if (item.dataValues.accountsAccountDetails) {
        item.dataValues = {
          ...item.dataValues,
          ...item.dataValues.accountsAccountDetails.dataValues
        }
        delete item.dataValues.accountsAccountDetails;
      }
      return item.dataValues;
    })
  }

  //#endregion

  //#region Returns
  return {
    fetchAllUser,
    fetchUserByPk,
    createUser,
    editUser,
    deleteUser,
  }
  //#endregion
})();

module.exports = userService;