const { DataTypes } = require("sequelize");
const sequelize = require("../connection/db");

const User = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    mobile: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    token: { type: DataTypes.STRING, unique: true, allowNull: false }
},{
    defaultScope: {
        attributes: { exclude: ["token"] }  //hide sensitive fields globally
    }
});

module.exports = User;

