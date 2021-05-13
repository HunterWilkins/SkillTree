const sequelize = require("../config/connection");
const {Model, DataTypes} = require("sequelize");

const bcrypt = require("bcryptjs");

class User extends Model{};

User.init({
    username: {
        type: DataTypes.STRING,
        validate: {
            len: [1,100]
        },
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        },
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        validate: {
            len: [8, 100]
        },
        allowNull: false
    }
}, {sequelize});

async function hashPassword(user) {
    user.password = await bcrypt.hash(user.password, bcrypt.genSaltSync(10), null);
}

User.addHook("beforeCreate", hashPassword);

module.exports = User;