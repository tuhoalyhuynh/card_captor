'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class own extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  own.init({
    userId: DataTypes.INTEGER,
    cardId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'own',
  });
  return own;
};