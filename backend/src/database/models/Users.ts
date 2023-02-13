import { DataTypes, INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class Users extends Model {
  declare id: number;
  declare email: string;
  declare password: string;
}

Users.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  modelName: 'users',
  tableName: 'users',
});

export default Users;