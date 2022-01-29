const { Op } = require('sequelize');
const logger = require('../lib/logger');
const { User, Department } = require('../models/index');

const dao = {
  insert(params) {
    return new Promise((resolve, reject) => {
      User.create(params).then((inserted) => {
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
    if (params.userid) {
      setQuery.where = {
        ...setQuery.where,
        userid: params.userid, // '='검색
      };
    }

    // order by 정렬 조건
    setQuery.order = [['id', 'DESC']];

    return new Promise((resolve, reject) => {
      User.findAndCountAll({
        ...setQuery,
        attributes: { exclude: ['password'] }, // password 필드 제외
        include: [
          {
            model: Department,
            as: 'Department',
          },
        ],
      }).then((selectedList) => {
        resolve(selectedList);
      }).catch((err) => {
        reject(err);
      });
    });
  },

  selectInfo(params) {
    return new Promise((resolve, reject) => {
      User.findByPk(
        params.id,
        {
          attributes: { exclude: ['password'] }, // password 필드 제외
          include: [
            {
              model: Department,
              as: 'Department',
            },
          ],
        },
      ).then((selectedInfo) => {
        resolve(selectedInfo);
      }).catch((err) => {
        reject(err);
      });
    });
  },

  update(params) {
    return new Promise((resolve, reject) => {
      User.update(
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
      User.destroy(
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
  selectUser(params) {
    return new Promise((resolve, reject) => {
      User.findOne({
        attributes: ['id', 'userid', 'password', 'name', 'role'],
        where: { userid: params.userid },
      }).then((selectedOne) => {
        resolve(selectedOne);
      }).catch((err) => {
        reject(err);
      });
    });
  },

};

module.exports = dao;
