import sequelize from '../database/models';
import accountWorkspacesModel from '../database/models/AccountWorkspaces';
import userModel from '../database/models/Users';
import workspacesModel from '../database/models/Workspaces';
import { IToken, IWorkspace } from '../interfaces';
import { ErrorClient } from '../utils';

export default class WorkspacesService {
  public getAll = async (accountId: number, user: IToken): Promise<IWorkspace[]> => {
    if (user.userId !== accountId) throw new ErrorClient(401, 'Unauthorized');
    const workspaces = await accountWorkspacesModel.findAll({
      where: { accountId },
      attributes: ['workspaceId'],
      include: [
        {
          model: workspacesModel,
          as: 'workspace',
          attributes: ['name', 'createdAt', 'lastUpdate'],
        },
      ],
    });
    return workspaces as unknown as IWorkspace[];
  };

  private getUsers = async (emails: string[]) => {
    const users = await Promise.all(emails.map(async (email) => {
      const user = await userModel.findOne({ where: { email }, attributes: ['id'] });
      if (!user) throw new ErrorClient(404, 'User not found');
      return user;
    }));
    return users;
  };

  public create = async (name: string, emails: string[]) => {
    const users = await this.getUsers(emails);
    try {
      const workspace = await sequelize.transaction(async (t) => {
        const { id: workspaceId } = await workspacesModel.create({ name }, { transaction: t });
        const newAccountWorkspaces = await Promise.all(users.map(async ({ id: accountId }) => {
          const accountWorkspaces = await accountWorkspacesModel
            .create({ accountId, workspaceId }, { transaction: t });
          return accountWorkspaces;
        }));
        return newAccountWorkspaces;
      });
      return workspace;
    } catch (err) {
      throw new ErrorClient(500, 'Internal server error');
    }
  };
}