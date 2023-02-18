import accountModel from '../database/models/Accounts';
import accountWorkspacesModel from '../database/models/AccountWorkspaces';
import { IAccountWorkspace, IMember, IToken } from '../interfaces';
import { ErrorClient } from '../utils';
import { INewMember, IRemove, IService } from './interfaces';
import IUpdate from './interfaces/IUpdate';
import { MembersValidations } from './validations';

export default class MembersService implements IService<IMember[], INewMember> {
  constructor(private readonly validations: MembersValidations) {
    this.validations = validations;
  }

  public getter = async (workspaceId: number, user: IToken): Promise<IMember[]> => {
    const accountIds = await this.validations.validateGetMembers(workspaceId, user);
    const membersPromise = accountIds.map(async ({ accountId, admin }: IAccountWorkspace) => {
      const account = await accountModel.findByPk(accountId, {
        attributes: [['id', 'accountId'], 'name', 'lastName', 'image'],
      });

      const member = { ...account?.dataValues, admin };
      return member;
    });
    
    const members = await Promise.all(membersPromise);
    return members;
  };

  public create = async ({ 
    workspaceId, email, admin,
  }: INewMember, user: IToken): Promise<void> => {
    const members = await this.getter(workspaceId, user);
    const accountId = await this.validations.insertValidations(email, members, user);
    await accountWorkspacesModel.create({ workspaceId, accountId, admin });
  };
  
  public remove = async (
    { id: workspaceId, email }: Omit<IRemove, 'key'>,
    user: IToken,
  ): Promise<void> => {
    const members = await this.getter(workspaceId, user);
    const accountId = await this.validations.removeValidations(workspaceId, user, members, email);
    await accountWorkspacesModel.destroy({ where: { workspaceId, accountId } });
  };

  public update = async (
    { id: workspaceId, key: accountId }: Omit<IUpdate, 'title' | 'content'>,
    user: IToken,
): Promise<void> => {
    if (user.userId === accountId) throw new ErrorClient(401, 'Unauthorized');
    const members = await this.getter(workspaceId, user);
    const { admin } = await this.validations.validateUsers(workspaceId, accountId, user, members);
    
    await accountWorkspacesModel.update({ admin: !admin }, { where: { workspaceId, accountId } });
  };
}