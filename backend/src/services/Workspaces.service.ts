import sequelize from '../database/models';
import accountWorkspacesModel from '../database/models/AccountWorkspaces';
import workspacesModel from '../database/models/Workspaces';
import { IToken, IWorkspace } from '../interfaces';
import { ErrorClient } from '../utils';
import MembersService from './Members.service';
import { WorkspacesValidations } from './validations';

export default class WorkspacesService {
  workspacesValidations: WorkspacesValidations;

  membersService: MembersService;

  constructor() {
    this.workspacesValidations = new WorkspacesValidations();
    this.membersService = new MembersService();
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

  public delete = async (workspaceId: number, user: IToken): Promise<void> => {
    const members = await this.membersService.getMembers(workspaceId, user);
    this.workspacesValidations.deleteValidations(members, user);
    try {
      await sequelize.transaction(async (t) => {
        await accountWorkspacesModel.destroy({ where: { workspaceId }, transaction: t });
        await workspacesModel.destroy({ where: { id: workspaceId }, transaction: t });
      });
    } catch (err) {
      throw new ErrorClient(500, 'Internal server error');
    }
  };
}