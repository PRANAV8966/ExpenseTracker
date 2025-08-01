'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payments.belongsTo(models.users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
});

    }
  }
  Payments.init({
    orderId: {
      type:DataTypes.STRING
    },
    paymentSessionId: {
      type:DataTypes.STRING
    },
    orderAmount: {
      type:DataTypes.FLOAT
    },
    orderCurrency: {
      type:DataTypes.STRING
    },
    orderStatus: {
      type:DataTypes.STRING
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
    },
  onDelete: 'CASCADE'
}
  }, {
    sequelize,
    modelName: 'Payments',
  });
  return Payments;
};