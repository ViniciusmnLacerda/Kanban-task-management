import { BOOLEAN, INTEGER, Model, STRING } from 'sequelize';
import db from '.';
import Accounts from './Accounts';
import Workspaces from './Workspaces';

class AccountWorkspaces extends Model {
  declare workspaceId: number;

  declare accountId: number;

  declare admin: boolean;
}

AccountWorkspaces.init({
  workspaceId: {
    type: STRING,
    primaryKey: true,
    allowNull: false,
  },
  accountId: {
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  admin: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  modelName: 'account_workspaces',
  tableName: 'account_workspaces',
});

AccountWorkspaces.belongsTo(Workspaces, { foreignKey: 'workspaceId', as: 'workspace' });
Workspaces.hasMany(AccountWorkspaces, { foreignKey: 'workspaceId', as: 'workspace' });
AccountWorkspaces.belongsTo(Accounts, { foreignKey: 'accountId', as: 'account' });
Accounts.hasMany(AccountWorkspaces, { foreignKey: 'accountId', as: 'account' });

export default AccountWorkspaces;