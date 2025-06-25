'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');
const { SALT } = require('../config/server-config.js');



module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });

  users.beforeCreate(async (users, options) => {
    const hashedPassword = await bcrypt.hash(users.password, parseInt(SALT));
    users.password = hashedPassword;
  })
  return users;
};