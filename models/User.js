const { DataTypes, Model } = require('sequelize');
const { hash, compare } = require('bcrypt');

const client = require('../config/connection');

class User extends Model {
  async validatePassword(formPassword) {
    // this keyword refers to the user you have found
    // ie. const user = User.findByPk(1); <--- user you found
    const is_valid = await compare(formPassword, this.password);

    return is_valid;
  }
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'That username is already in use'
      },
      validate: {
        len: {
          args: 2,
          msg: 'Username must be at least 2 characters in length'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'That email address is already in use'
      },
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: 6,
          msg: 'Password must be at least 6 characters in length'
        }
      }
    }
  },
  {
    sequelize: client,
    modelName: 'user',
    hooks: {
      async beforeCreate(user) {
        user.password = await hash(user.password, 10);

        return user;
      }
    }
  }
);

module.exports = User;