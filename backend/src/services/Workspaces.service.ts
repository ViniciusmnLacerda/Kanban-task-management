import sequelize from '../database/models';
import accountWorkspacesModel from '../database/models/AccountWorkspaces';
import workspacesModel from '../database/models/Workspaces';
import { IToken, IWorkspace } from '../interfaces';
import { ErrorClient } from '../utils';
import IService from './interfaces/IService';
import MembersService from './Members.service';
import { WorkspacesValidations } from './validations';

export default class WorkspacesService implements IService<IWorkspace[], string[], string> {
  constructor(
    private readonly service: MembersService,
    private readonly validations: WorkspacesValidations,
) {
    this.validations = validations;
    this.service = service;
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

  public create = async (name: string, emails: string[], user: IToken): Promise<void> => {
    const users = await this.validations.validateUsers(emails, user);
    try {
      await sequelize.transaction(async (t) => {
        const { id: workspaceId } = await workspacesModel.create({ name }, { transaction: t });
        const newAccountWorkspaces = await Promise.all(users
          .map(async ({ id: accountId }, index) => {
          const accountWorkspaces = await accountWorkspacesModel
            .create({ accountId, workspaceId, owner: index === 0 }, { transaction: t });
          return accountWorkspaces;
        }));
        return newAccountWorkspaces;
      });
    } catch (err) {
      throw new ErrorClient(500, 'Internal server error');
    }
  };

  public remove = async (workspaceId: number, user: IToken): Promise<void> => {
    const members = await this.service.getAll(workspaceId, user);
    this.validations.adminValidations(members, user);
    try {
      await sequelize.transaction(async (t) => {
        await accountWorkspacesModel.destroy({ where: { workspaceId }, transaction: t });
        await workspacesModel.destroy({ where: { id: workspaceId }, transaction: t });
      });
    } catch (err) {
      throw new ErrorClient(500, 'Internal server error');
    }
  };

  public update = async (workspaceId: number, name: string, user: IToken): Promise<void> => {
    const members = await this.service.getAll(workspaceId, user);
    this.validations.adminValidations(members, user);
    await workspacesModel.update({ name }, { where: { id: workspaceId } });
  };
}