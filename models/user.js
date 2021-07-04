'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({post}) {
      // define association here
      this.hasMany(post, {foreignKey: 'userId'})
    }

    toJSON(){
      return {...this.get(), id: undefined}
    }
  };
  User.init({
    uuid:{ type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name:{ type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {msg: 'You need to enter the name'},
      notEmpty: {msg: 'Your name cannot be empty'}
    }
  },
    email: {type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {msg: 'You need to enter the email'},
      notEmpty: {msg: 'Your email cannot be empty'},
      isEmail: {msg: 'This is not a valid email'}
    }
  },
    role:{type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'You need to enter the role'},
        notEmpty: {msg: 'Your role cannot be empty'}
      }
    }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};