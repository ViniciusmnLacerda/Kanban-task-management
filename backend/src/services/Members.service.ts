import accountModel from '../database/models/Accounts';
import accountWorkspacesModel from '../database/models/AccountWorkspaces';
import { IAccountWorkspace } from '../interfaces';
import { ErrorClient } from '../utils';

export default class MembersService {
  public getMembers = async (workspaceId: number) => {
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
}