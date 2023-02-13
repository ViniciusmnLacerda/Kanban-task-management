"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require(".");
const Users_1 = require("./Users");
class Accounts extends sequelize_1.Model {
}
Accounts.init({
    id: {
        type: sequelize_1.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    accountId: {
        type: sequelize_1.INTEGER,
    },
    name: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    image: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
}, {
    underscored: true,
    sequelize: _1.default,
    timestamps: false,
    modelName: 'accounts',
    tableName: 'accounts',
});
Accounts.belongsTo(Users_1.default, { foreignKey: 'accountId', as: 'accountId' });
Users_1.default.hasOne(Accounts, { foreignKey: 'accountId', as: 'accountId' });
exports.default = Accounts;
//# sourceMappingURL=Accounts.js.map