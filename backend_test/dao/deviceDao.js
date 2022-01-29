const { Op } = require('sequelize');
const logger = require('../lib/logger');
const { Device } = require('../models/index');

const dao = {
  insert(params) {
    return new Promise((resolve, reject) => {
      Device.create(params).then((inserted) => {
        // password 제외 리턴
        const insertedResult = { ...inserted };
        delete insertedResult.dataValues.password;

        resolve(inserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  selectList(params) {
    // where 검색 조건
    const setQuery = {};
    if (params.name) {
      setQuery.where = {
        ...setQuery.where,
        name: { [Op.like]: `%${params.name}%` }, // like검색
      };
    }
    if (params.device_model_name) {
      setQuery.where = {
        ...setQuery.where,
        device_model_name: params.device_model_name, // '='검색
      };
    }
    logger.debug(`(deviceDAO.selectList) ${JSON.stringify(setQuery)}`);

    setQuery.order = [['id', 'DESC']];

    return new Promise((resolve, reject) => {
      Device.findAndCountAll({
        ...setQuery,

      }).then((selectedList) => {
        resolve(selectedList);
      }).catch((err) => {
        reject(err);
      });
    });
  },

  selectInfo(params) {
    return new Promise((resolve, reject) => {
      Device.findByPk(
        params.id,
      ).then((selectedInfo) => {
        resolve(selectedInfo);
      }).catch((err) => {
        reject(err);
      });
    });
  },

  update(params) {
    return new Promise((resolve, reject) => {
      Device.update(
        params,
        {
          where: { id: params.id },
        },
      ).then(([updated]) => {
        resolve({ updatedCount: updated });
      }).catch((err) => {
        reject(err);
      });
    });
  },

  delete(params) {
    return new Promise((resolve, reject) => {
      Device.destroy(
        {
          where: { id: params.id },
        },
      ).then((deleted) => {
        resolve({ deletedCount: deleted });
      }).catch((err) => {
        reject(err);
      });
    });
  },

};

module.exports = dao;
