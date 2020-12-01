'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class want extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  want.init({
    userId: DataTypes.INTEGER,
    cardId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'want',
  });
  return want;
};