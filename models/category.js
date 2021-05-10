const sequelize = require("../config/connection");
const {Model, DataTypes} = require("sequelize");

class Category extends Model{};

Category.init({
    title: {
        type: DataTypes.STRING,
        validate: {
            len: [1,100]
        }
    }
}, {sequelize});

module.exports = Category;