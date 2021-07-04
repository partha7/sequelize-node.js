'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      // define association here
      this.belongsTo(User, {foreignKey: 'userId'})
    }

    toJSON(){
      return {...this.get(), id: undefined, userId: undefined}
    }
  };
  post.init({
    uuid:{ type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    body: {type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notNull: {msg: 'You need to enter the body'},
              notEmpty: {msg: 'Your body cannot be empty'}
            }
    }
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};