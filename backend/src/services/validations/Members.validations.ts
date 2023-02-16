import accountWorkspacesModel from '../../database/models/AccountWorkspaces';
import { IAccountWorkspace, IMember, IToken } from '../../interfaces';
import { ErrorClient } from '../../utils';
import { IMembersValidation } from './interfaces';

export default class MembersValidations implements IMembersValidation {
  public validateGetMembers = async (
    workspaceId: number,
    { userId }: IToken,
    ): Promise<IAccountWorkspace[]> => {
    const accountIds = await accountWorkspacesModel.findAll({ 
      where: { workspaceId },
      attributes: ['accountId', 'admin'], 
    }) as unknown as IAccountWorkspace[];
  
  if (accountIds.length === 0) throw new ErrorClient(404, 'Workspace not found'); 
  const isMember = accountIds
    .find((account: IAccountWorkspace) => account.accountId === userId);  
  
  if (!isMember) throw new ErrorClient(401, 'User is not a member'); 
  return accountIds as unknown as IAccountWorkspace[];
  }; 

  public validateUsers = async (
    workspaceId: number,
    accountId:number,
    user: IToken,
    members: IMember[],
): Promise<IMember> => {
    const isMember = members.find((member) => +member.accountId === user.userId);
    if (!isMember) throw new ErrorClient(401, 'Unauthorized');
    const isAdmin = isMember.admin === true;
    if (!isAdmin) throw new ErrorClient(401, 'Unauthorized');
    const isAccountValid = members.find((member) => +member.accountId === accountId);
    if (!isAccountValid) throw new ErrorClient(404, 'User not found');
    return isAccountValid;
  };
}