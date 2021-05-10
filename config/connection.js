require("dotenv").config();

const Sequelize = require("sequelize");

const sequelize = process.env.JAWSDB_URL ? 
    new Sequelize(process.env.JAWSDB_URL) :
    new Sequelize(
    process.env.db, process.env.db_user, process.env.db_password, 
    {
        host: "localhost",
        port: 3306,
        dialect: "mysql",

    });

module.exports = sequelize;