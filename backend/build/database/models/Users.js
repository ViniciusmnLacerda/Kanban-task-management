"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require(".");
class Users extends sequelize_1.Model {
}
Users.init({
    id: {
        type: sequelize_1.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.STRING,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    underscored: true,
    sequelize: _1.default,
    timestamps: false,
    modelName: 'users',
    tableName: 'users',
});
exports.default = Users;
//# sourceMappingURL=Users.js.map