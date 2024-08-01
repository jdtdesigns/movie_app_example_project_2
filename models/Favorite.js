const { DataTypes, Model } = require('sequelize');
const client = require('../config/connection');

class Favorite extends Model { }

Favorite.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    release_date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    director: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imdbID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER
    }
  },
  {
    sequelize: client,
    modelName: 'favorite'
  }
);

module.exports = Favorite;