import accountWorkspacesModel from '../../database/models/AccountWorkspaces';
import usersModel from '../../database/models/Users';
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
  
  if (!isMember) throw new ErrorClient(401, 'Unauthorized'); 
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

  public insertValidations = async (
    email: string,
    members: IMember[],
    { userId }: IToken,
    ): Promise<number> => {
    const doesUserExist = await usersModel.findOne({ where: { email } });
    if (!doesUserExist) throw new ErrorClient(404, 'User not found');
    const isMember = members.find((member) => member.accountId === doesUserExist.id);
    if (isMember) throw new ErrorClient(401, 'The user is already a member');
    const isAdmin = members.find((member) => member.accountId === userId);
    if (!isAdmin?.admin) throw new ErrorClient(401, 'Unauthorized');
    return doesUserExist.id;
  };
}