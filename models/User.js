const { DataTypes } = require("sequelize");
const sequelize = require("../connection/db");

const User = sequelize.define("user", {
    name: { type: DataTypes.STRING, allowNull: false },
    mobile: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    token: { type: DataTypes.STRING, unique: true, allowNull: false }
});

module.exports = User;
