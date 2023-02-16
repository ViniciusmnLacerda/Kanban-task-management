import accountModel from '../database/models/Accounts';
import accountWorkspacesModel from '../database/models/AccountWorkspaces';
import { IAccountWorkspace, IMember, IToken } from '../interfaces';
import { ErrorClient } from '../utils';
import { IMembersService } from './interfaces';
import { MembersValidations } from './validations';

export default class MembersService implements IMembersService {
  constructor(private readonly validations: MembersValidations) {
    this.validations = validations;
  }

  public getMembers = async (workspaceId: number, user: IToken): Promise<IMember[]> => {
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

  public toggleAdmin = async (workspaceId: number, accountId: number, user: IToken) => {
    if (user.userId === accountId) throw new ErrorClient(401, 'Unauthorized');
    const members = await this.getMembers(workspaceId, user);
    const { admin } = await this.validations.validateUsers(workspaceId, accountId, user, members);
    
    await accountWorkspacesModel.update({ admin: !admin }, { where: { workspaceId, accountId } });
  };
}