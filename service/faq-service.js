const faqService = (() => {
  //#region Plugins
  const conn = require('../common/mssql-connection');
  const Sequelize = require('sequelize');
  const Op = Sequelize.Op;
  //#endregion

  //#region Models
  const faq = require('../model/faq');
  //#endregion

  //#region Utils
  const commonUtils = require('../util/commonUtils');
  //#endregion

  //#region Functions
  const fetchAllFAQ = (req) => {
    return new Promise(async (resolve, reject) => {
      faq.findAndCountAll()
        // faq.findAll()
        .then(response => {
          resolve(response);
        }).catch(error => {
          console.log(error);
          return reject(error);
        })
    })
  }

  const fetchFAQByPk = (req) => {
    return new Promise(async (resolve, reject) => {
      const pk = req.params.pk;
      faq.findByPk(pk)
        .then(response => {
          resolve(response);
        }).catch(error => {
          console.log(error);
          return reject(error);
        })
    })
  }

  const createFAQ = (req) => {
    return new Promise(async (resolve, reject) => {
      let body = req.body;
      faq.create(body)
        .then(response => {
          resolve(response);
        }).catch(error => {
          console.log(error);
          return reject(error);
        })
    })
  }

  const editFAQ = (req) => {
    return new Promise(async (resolve, reject) => {
      let body = req.body;
      faq.update(body, { where: { id: body.id } })
        .then(response => {
          resolve(response);
        }).catch(error => {
          console.log(error);
          return reject(error);
        })
    })
  }

  const deleteFAQ = (req) => {
    return new Promise(async (resolve, reject) => {
      let id = req.params.id;
      faq.destroy({ where: { id } })
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
        faq.update(body, { where: { id: body.id } }),
        // faq.update({ visible: false }, { where: { id: { [Op.ne]: body.id } } })
      ]).then(response => {
        resolve(response);
      }).catch(error => {
        console.log(error);
        return reject(error);
      })
    })
  }

  const fetchFAQForPublic = (req) => {
    return new Promise(async (resolve, reject) => {
      const queryParams = req.query;
      faq.findAll({
        where: {
          visible: true,
          ...(queryParams.question && {
            question: { [Op.like]: `%${commonUtils.replaceAndLowerCase(queryParams.question, '-', ' ')}%` }
          })
        }
      })
        .then(response => {
          resolve(response);
        }).catch(error => {
          console.log(error);
          return reject(error);
        })
    })
  }

  const searchSections = (req) => {
    return new Promise(async (resolve, reject) => {
      faq.findAll({
        attributes: [[Sequelize.literal('DISTINCT section'), 'section']]
      })
        .then(response => {
          console.log('search sections response', response);
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
    fetchAllFAQ,
    fetchFAQByPk,
    createFAQ,
    editFAQ,
    deleteFAQ,
    updateVisible,
    fetchFAQForPublic,
    searchSections
  }
  //#endregion
})();

module.exports = faqService;