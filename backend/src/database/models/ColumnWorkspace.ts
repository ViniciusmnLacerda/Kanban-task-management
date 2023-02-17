import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';
import Columns from './Column';
import Workspaces from './Workspaces';

class ColumnWorkspaces extends Model {
  declare columnId: number;

  declare workspaceId: number;
}

ColumnWorkspaces.init({
  columnId: {
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  workspaceId: {
    type: STRING,
    primaryKey: true,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  modelName: 'column_workspaces',
  tableName: 'column_workspaces',
});

ColumnWorkspaces.belongsTo(Workspaces, { foreignKey: 'workspaceId', as: 'workspace' });
Workspaces.hasMany(ColumnWorkspaces, { foreignKey: 'workspaceId', as: 'workspace' });
ColumnWorkspaces.belongsTo(Columns, { foreignKey: 'columnId', as: 'column' });
Columns.hasMany(ColumnWorkspaces, { foreignKey: 'columnId', as: 'column' });

export default ColumnWorkspaces;