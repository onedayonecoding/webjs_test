const logger = require('../lib/logger');
const deviceDao = require('../dao/deviceDao');

const service = {
  async reg(params) {
    let inserted = null;

    const newParams = {
      ...params,
    };

    try {
      inserted = await deviceDao.insert(newParams);
      logger.debug(`(deviceService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(deviceService.reg) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
  async list(params) {
    let result = null;

    try {
      result = await deviceDao.selectList(params);
      logger.debug(`(deviceService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(deviceService.list) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  async info(params) {
    let result = null;

    try {
      result = await deviceDao.selectInfo(params);
      logger.debug(`(deviceService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.debug(`(deviceService.info) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  async edit(params) {
    let result = null;

    try {
      result = await deviceDao.update(params);
      logger.debug(`(deviceService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(deviceService.edit) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  async delete(params) {
    let result = null;

    try {
      result = await deviceDao.delete(params);
      logger.debug(`(deviceService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.debug(`(deviceService.delete) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    return new Promise((resolve) => {
      resolve(result);
    });
  },
};

module.exports = service;
