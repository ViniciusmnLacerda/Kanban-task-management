import { IAccountWorkspace, IMember, IToken } from '../../../interfaces';

export default interface IMembersValidations {
  validateUsers: (
    workspaceId: number,
    accountId:number,
    user: IToken,
    members: IMember[]
  ) => Promise<IMember>;
  validateGetMembers: (workspaceId: number, user: IToken) => Promise<IAccountWorkspace[]>; 
}