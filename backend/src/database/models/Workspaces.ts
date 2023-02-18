import { DataTypes, DATE, INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class Workspaces extends Model {
  declare id: number;

  declare title: string;

  declare createdAt: string;
}

Workspaces.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: STRING,
    allowNull: false,
  },
  createdAt: {
    type: DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  lastUpdate: {
    type: DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  modelName: 'workspaces',
  tableName: 'workspaces',
});

export default Workspaces;