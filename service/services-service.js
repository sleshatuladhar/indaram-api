const aboutusService = (() => {
  //#region Plugins
  const conn = require('../common/mssql-connection');
  const Op = require('sequelize').Op;
  //#endregion

  //#region Models
  const services = require('../model/services');
  //#endregion

  //#region Functions
  const fetchAllServices = (req) => {
    return new Promise(async (resolve, reject) => {
      services.findAndCountAll()
        .then(response => {
          resolve(response);
        }).catch(error => {
          console.log(error);
          return reject(error);
        })
    })
  }

  const fetchServicesByPk = (req) => {
    return new Promise(async (resolve, reject) => {
      const pk = req.params.pk;
      services.findByPk(pk)
        .then(response => {
          resolve(response);
        }).catch(error => {
          console.log(error);
          return reject(error);
        })
    })
  }

  const createServices = (req) => {
    return new Promise(async (resolve, reject) => {
      let body = req.body;
      services.create(body)
        .then(response => {
          resolve(response);
        }).catch(error => {
          console.log(error);
          return reject(error);
        })
    })
  }

  const editServices = (req) => {
    return new Promise(async (resolve, reject) => {
      let body = req.body;
      services.update(body, { where: { id: body.id } })
        .then(response => {
          resolve(response);
        }).catch(error => {
          console.log(error);
          return reject(error);
        })
    })
  }

  const deleteServices = (req) => {
    return new Promise(async (resolve, reject) => {
      let id = req.params.id;
      services.destroy({ where: { id } })
        .then(response => {
          resolve(response);
        }).catch(error => {
          console.log(error);
          return reject(error);
        })
    })
  }

  const updateVisible = (req) => {
    return new Promise(async (resolve, reject) => {
      let body = req.body;
      return Promise.all([
        services.update(body, { where: { id: body.id } }),
        // services.update({ visible: false }, { where: { id: { [Op.ne]: body.id } } })
      ]).then(response => {
        resolve(response);
      }).catch(error => {
        console.log(error);
        return reject(error);
      })
    })
  }

  const fetchServicesForPublic = (req) => {
    return new Promise(async (resolve, reject) => {
      services.findAll({ where: { visible: true } })
        .then(response => {
          resolve(response);
        }).catch(error => {
          console.log(error);
          return reject(error);
        })
    })
  }

  //#endregion

  //#region Returns
  return {
    fetchAllServices,
    fetchServicesByPk,
    createServices,
    editServices,
    deleteServices,
    updateVisible,
    fetchServicesForPublic
  }
  //#endregion
})();

module.exports = aboutusService;