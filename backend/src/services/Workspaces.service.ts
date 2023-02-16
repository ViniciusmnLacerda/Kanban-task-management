import sequelize from '../database/models';
import accountWorkspacesModel from '../database/models/AccountWorkspaces';
import workspacesModel from '../database/models/Workspaces';
import { IToken, IWorkspace } from '../interfaces';
import { ErrorClient } from '../utils';
import { WorkspacesValidations } from './validations';

export default class WorkspacesService {
  workspacesValidations: WorkspacesValidations;

  constructor() {
    this.workspacesValidations = new WorkspacesValidations();
  }

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

  public create = async (name: string, emails: string[], user: IToken): Promise<IWorkspace[]> => {
    const users = await this.workspacesValidations.validateUsers(emails, user);
    try {
      const workspace = await sequelize.transaction(async (t) => {
        const { id: workspaceId } = await workspacesModel.create({ name }, { transaction: t });
        const newAccountWorkspaces = await Promise.all(users
          .map(async ({ id: accountId }, index) => {
          const accountWorkspaces = await accountWorkspacesModel
            .create({ accountId, workspaceId, owner: index === 0 }, { transaction: t });
          return accountWorkspaces;
        }));
        return newAccountWorkspaces;
      });
      return workspace as unknown as IWorkspace[];
    } catch (err) {
      throw new ErrorClient(500, 'Internal server error');
    }
  };
}