'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.City, {
        foreignKey: 'cityId',
        onDelete: 'CASCADE',
      });
      this.hasMany(models.Flight, {
        foreignKey: 'departureAirportId',
        onDelete: 'CASCADE',
        
      });
      this.hasMany(models.Flight, {
        foreignKey: 'arrivalAirportId',
        onDelete: 'CASCADE',
      });
    }
  }
  Airport.init({
    name:{type: DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate: {
        notEmpty: true,
      }
    },
    code: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate: {
        notEmpty: true,
      }
    },
    address: {
      type: DataTypes.STRING,   
    },
    cityId:{
      type: DataTypes.INTEGER,
      allowNull:false,
      validate: {
        notEmpty: true,
        isNumeric: true,
      }
    }
  }, {
    sequelize,
    modelName: 'Airport',
  });
  return Airport;
};