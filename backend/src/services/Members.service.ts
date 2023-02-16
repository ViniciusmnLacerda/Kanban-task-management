import accountModel from '../database/models/Accounts';
import accountWorkspacesModel from '../database/models/AccountWorkspaces';
import { IAccountWorkspace, IMember, IToken } from '../interfaces';
import { ErrorClient } from '../utils';
import MembersValidations from './validations/Members.validations';

export default class MembersService {
  membersValidations: MembersValidations;

  constructor() {
    this.membersValidations = new MembersValidations();
  }

  public getMembers = async (workspaceId: number): Promise<IMember[]> => {
    const accountIds = await accountWorkspacesModel.findAll({ 
        where: { workspaceId },
        attributes: ['accountId', 'admin'], 
      }) as unknown as IAccountWorkspace[];
      
    if (accountIds.length === 0) throw new ErrorClient(404, 'Workspace not found'); 
    const members = await Promise.all(accountIds
        .map(async ({ accountId, admin }: IAccountWorkspace) => {
      const account = await accountModel.findByPk(accountId, {
        attributes: [['id', 'accountId'], 'name', 'lastName', 'image'],
      });

      const member = { ...account?.dataValues, admin };
      return member;
    }));
    return members;
  };

  public toggleAdmin = async (workspaceId: number, accountId: number, user: IToken) => {
    if (user.userId === accountId) throw new ErrorClient(401, 'Unauthorized');
    const members = await this.getMembers(workspaceId);
    const { admin: role } = await this.membersValidations
      .validateUsers(workspaceId, accountId, user, members);
    
    const result = accountWorkspacesModel
      .update({ admin: !role }, { where: { workspaceId, accountId } });
    
    return result;
  };
}