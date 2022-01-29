const Sequelize = require('sequelize');

module.exports = class Department extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: Sequelize.STRING(50),
      },
      code: {
        type: Sequelize.STRING(50),
      },
      description: {
        type: Sequelize.TEXT,
      },
    }, {
      sequelize,
      underscored: true,
      timestamps: true,
      paranoid: true,
    });
  }

  // 여러 user를 가지고 있다
  static associate(db) {
    db.Department.hasMany(db.User, { foreignKey: { name: 'departmentId' }, onDelete: 'SET NULL', as: 'Users' });
  }
};
