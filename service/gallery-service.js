const aboutusService = (() => {
  //#region Plugins
  const conn = require('../common/mssql-connection');
  const Op = require('sequelize').Op;
  //#endregion

  //#region Models
  const gallery = require('../model/gallery');
  //#endregion

  //#region Functions
  const fetchAllGallery = (req) => {
    return new Promise(async (resolve, reject) => {
      gallery.findAndCountAll()
        // gallery.findAll()
        .then(response => {
          resolve(response);
        }).catch(error => {
          console.log(error);
          return reject(error);
        })
    })
  }

  const fetchGalleryByPk = (req) => {
    return new Promise(async (resolve, reject) => {
      const pk = req.params.pk;
      gallery.findByPk(pk)
        .then(response => {
          resolve(response);
        }).catch(error => {
          console.log(error);
          return reject(error);
        })
    })
  }

  const createGallery = (req) => {
    return new Promise(async (resolve, reject) => {
      let body = req.body;
      gallery.create(body)
        .then(response => {
          resolve(response);
        }).catch(error => {
          console.log(error);
          return reject(error);
        })
    })
  }

  const editGallery = (req) => {
    return new Promise(async (resolve, reject) => {
      let body = req.body;
      gallery.update(body, { where: { id: body.id } })
        .then(response => {
          resolve(response);
        }).catch(error => {
          console.log(error);
          return reject(error);
        })
    })
  }

  const deleteGallery = (req) => {
    return new Promise(async (resolve, reject) => {
      let id = req.params.id;
      gallery.destroy({ where: { id } })
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
        gallery.update(body, { where: { id: body.id } }),
        // gallery.update({ visible: false }, { where: { id: { [Op.ne]: body.id } } })
      ]).then(response => {
        resolve(response);
      }).catch(error => {
        console.log(error);
        return reject(error);
      })
    })
  }

  const fetchGalleryForPublic = (req) => {
    return new Promise(async (resolve, reject) => {
      gallery.findAll({ where: { visible: true } })
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
    fetchAllGallery,
    fetchGalleryByPk,
    createGallery,
    editGallery,
    deleteGallery,
    updateVisible,
    fetchGalleryForPublic
  }
  //#endregion
})();

module.exports = aboutusService;