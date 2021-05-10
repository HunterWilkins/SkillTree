const sequelize = require("../config/connection");
const {Model, DataTypes} = require("sequelize");

class Skill extends Model {};

Skill.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1,100]
        }
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1,100]
        }
    },
    level: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    current: {
        type: DataTypes.STRING, // Stringified JSON Object that will be parsed
        allowNull: false
    },
    goal: {
        type: DataTypes.STRING, // ...^^
        allowNull: false
    }

}, {sequelize});

module.exports = Skill;
