import sequelize from '../database/models';
import accountWorkspacesModel from '../database/models/AccountWorkspaces';
import workspacesModel from '../database/models/Workspaces';
import { IToken, IWorkspace } from '../interfaces';
import { ErrorClient } from '../utils';
import { INewWorkspace, IRemove } from './interfaces';
import IService from './interfaces/IService';
import IUpdate from './interfaces/IUpdate';
import MembersService from './Members.service';
import { WorkspacesValidations } from './validations';

export default class WorkspacesService implements IService<IWorkspace[], INewWorkspace> {
  constructor(
    private readonly service: MembersService,
    private readonly validations: WorkspacesValidations,
) {
    this.validations = validations;
    this.service = service;
  }

  public getter = async (accountId: number, { userId }: IToken): Promise<IWorkspace[]> => {
    if (userId !== accountId) throw new ErrorClient(401, 'Unauthorized');
    const workspaces = await accountWorkspacesModel.findAll({
      where: { accountId },
      attributes: ['workspaceId'],
      include: [
        {
          model: workspacesModel,
          as: 'workspace',
          attributes: ['title', 'createdAt', 'lastUpdate'],
        },
      ],
    });
    return workspaces as unknown as IWorkspace[];
  };

  public create = async ({ name, emails }: INewWorkspace, user: IToken): Promise<void> => {
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

  public remove = async (
    { id: workspaceId }: Omit<IRemove, 'email'>, 
    user: IToken,
): Promise<void> => {
    const members = await this.service.getter(workspaceId, user);
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

  public update = async (
    { id, title }: Omit<IUpdate, 'content' | 'accountId'>,
    user: IToken,
): Promise<void> => {
    const members = await this.service.getter(id, user);
    this.validations.adminValidations(members, user);
    await workspacesModel.update({ title }, { where: { id } });
  };
}