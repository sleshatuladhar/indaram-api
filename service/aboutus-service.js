const aboutusService = (() => {
  //#region Plugins
  const conn = require('../common/mssql-connection');
  const Op = require('sequelize').Op;
  //#endregion

  //#region Models
  const aboutusAboutus = require('../model/aboutus-aboutus');
  //#endregion

  //#region Functions
  const fetchAllAboutUs = (req) => {
    return new Promise(async (resolve, reject) => {
      aboutusAboutus.findAndCountAll()
        // aboutusAboutus.findAll()
        .then(response => {
          resolve(response);
        }).catch(error => {
          console.log(error);
          return reject(error);
        })
    })
  }

  const fetchAboutUsByPk = (req) => {
    return new Promise(async (resolve, reject) => {
      const pk = req.params.pk;
      aboutusAboutus.findByPk(pk)
        .then(response => {
          resolve(response);
        }).catch(error => {
          console.log(error);
          return reject(error);
        })
    })
  }

  const createAboutUs = (req) => {
    return new Promise(async (resolve, reject) => {
      let body = req.body;
      aboutusAboutus.create(body)
        .then(response => {
          resolve(response);
        }).catch(error => {
          console.log(error);
          return reject(error);
        })
    })
  }

  const editAboutUs = (req) => {
    return new Promise(async (resolve, reject) => {
      let body = req.body;
      aboutusAboutus.update(body, { where: { id: body.id } })
        .then(response => {
          resolve(response);
        }).catch(error => {
          console.log(error);
          return reject(error);
        })
    })
  }

  const deleteAboutUs = (req) => {
    return new Promise(async (resolve, reject) => {
      let id = req.params.id;
      aboutusAboutus.destroy({ where: { id } })
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
        aboutusAboutus.update(body, { where: { id: body.id } }),
        aboutusAboutus.update({ visible: false }, { where: { id: { [Op.ne]: body.id } } })
      ]).then(response => {
        resolve(response);
      }).catch(error => {
        console.log(error);
        return reject(error);
      })
    })
  }

  const fetchAboutUsForPublic = (req) => {
    return new Promise(async (resolve, reject) => {
      aboutusAboutus.findOne({ where: { visible: true } })
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
    fetchAllAboutUs,
    fetchAboutUsByPk,
    createAboutUs,
    editAboutUs,
    deleteAboutUs,
    updateVisible,
    fetchAboutUsForPublic
  }
  //#endregion
})();

module.exports = aboutusService;