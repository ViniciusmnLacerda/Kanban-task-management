/* eslint-disable complexity */
import accountWorkspacesModel from '../../database/models/AccountWorkspaces';
import usersModel from '../../database/models/Users';
import { IAccountWorkspace, IMember, IToken } from '../../interfaces';
import { ErrorClient } from '../../utils';
import { IMembersValidation } from './interfaces';

export default class MembersValidations implements IMembersValidation {
  private USER_NOT_FOUND: string;

  private UNAUTHORIZED: string;

  constructor() {
    this.USER_NOT_FOUND = 'User not found';
    this.UNAUTHORIZED = 'Unauthorized';
  }

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
  
  if (!isMember) throw new ErrorClient(401, this.UNAUTHORIZED); 
  return accountIds as unknown as IAccountWorkspace[];
  }; 

  public validateUsers = async (
    workspaceId: number,
    accountId:number,
    user: IToken,
    members: IMember[],
): Promise<IMember> => {
    const isMember = members.find((member) => +member.accountId === user.userId);
    if (!isMember) throw new ErrorClient(401, this.UNAUTHORIZED);
    const isAdmin = isMember.admin === true;
    if (!isAdmin) throw new ErrorClient(401, this.UNAUTHORIZED);
    const isAccountValid = members.find((member) => +member.accountId === accountId);
    if (!isAccountValid) throw new ErrorClient(404, this.USER_NOT_FOUND);
    return isAccountValid;
  };

  public insertValidations = async (
    email: string,
    members: IMember[],
    { userId }: IToken,
    ): Promise<number> => {
    const doesUserExist = await usersModel.findOne({ where: { email } });
    if (!doesUserExist) throw new ErrorClient(404, this.USER_NOT_FOUND);
    const isMember = members.find((member) => member.accountId === doesUserExist.id);
    if (isMember) throw new ErrorClient(401, 'The user is already a member');
    const isAdmin = members.find((member) => member.accountId === userId);
    if (!isAdmin?.admin) throw new ErrorClient(401, this.UNAUTHORIZED);
    return doesUserExist.id;
  };

  public removeValidations = async (
    workspaceId: number,
    { userId }: IToken,
    members: IMember[],
    email?: string,
    ): Promise<number> => {
      const userIsMember = members.find(({ accountId }) => accountId === userId); 
      if (!userIsMember) throw new ErrorClient(401, this.UNAUTHORIZED);
      const userToRemove = await usersModel.findOne({ where: { email } });
      if (!userToRemove) throw new ErrorClient(404, 'User not found');
      const isUserToRemoveMember = members.find(({ accountId }) => accountId === userToRemove?.id);
      if (!isUserToRemoveMember) throw new ErrorClient(404, 'User is not member');
      if (isUserToRemoveMember.accountId === userId) return userId;
      if (!userIsMember.admin) throw new ErrorClient(404, this.UNAUTHORIZED);
      return userToRemove.id;
    };
}
