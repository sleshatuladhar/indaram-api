const userService = (() => {
  //#region Plugins
  const conn = require('../common/mssql-connection');
  const Op = require('sequelize').Op;
  //#endregion

  //#region Models
  const authGroupPermissions = require('../model/auth-group-permissions');
  const authGroup = require('../model/auth-group');
  const authPermission = require('../model/auth-permission');
  //#endregion

  //#region Functions
  const assignAuthGroupPermissions = (req) => {
    return new Promise(async (resolve, reject) => {
      let body = req.body;
      const authGroupData = await authGroup.findOne({
        where: { name: body.name }
      })

      const permissionListForGroup = getPermissionListForGroup(body.name && body.name.toLowerCase());

      const permissionIdList = await authPermission.findAll({
        where: {
          contentTypeId: { [Op.in]: permissionListForGroup.contentTypeId },
          type: { [Op.in]: permissionListForGroup.type }
        }
      }).catch(error => {
        console.log(error);
        return reject(error);
      })

      const authGroupPermissionsData = permissionIdList.map(x => {
        return {
          permissionId: x.id,
          groupId: authGroupData.id
        }
      })

      await authGroupPermissions.bulkCreate(authGroupPermissionsData)
        .then(response => {
          console.log(response);
          return resolve(response);
        }).catch(error => {
          console.log(error);
          return reject(error);
        })
    })
  }

  const getPermissionListForGroup = (groupName = '') => {
    switch (groupName) {
      case 'superuser': {
        return {
          contentTypeId: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          type: ['add', 'update', 'delete', 'view']
        }
      }
      case 'admin': {
        return {
          contentTypeId: [2, 3, 5, 6, 7, 8, 9, 10, 11, 12],
          type: ['add', 'update', 'delete', 'view']
        }
      }
      case 'staff': {
        return {
          contentTypeId: [5, 6, 7, 8, 9, 10, 11, 12],
          type: ['view']
        }
      }
      case 'user': {
        return {
          contentTypeId: [5, 6, 7, 8, 9, 10, 11, 12],
          type: ['view']
        }
      }
      default: {
        return {
          contentTypeId: [5, 6, 7, 8, 9, 10, 11, 12],
          type: ['view']
        }
      }
    }
  }

  // assignAuthGroupPermissions({
  //   body: {
  //     name: 'User'
  //   }
  // })

  const fetchAuthGroupPermissionsByGroupId = (req) => {
    return new Promise(async (resolve, reject) => {
      const body = req.body;
      authGroupPermissions.findAll({
        where: { groupId: body.groupId }
      }).then(response => {
        resolve(response);
      }).catch(error => {
        console.log(error);
        return reject(error);
      })
    })
  }


  //#region Returns
  return {
    assignAuthGroupPermissions,
    fetchAuthGroupPermissionsByGroupId
  }
  //#endregion
})();

module.exports = userService;