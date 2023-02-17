import { IAccountWorkspace, IMember, IToken } from '../../../interfaces';

export default interface IMembersValidations {
  validateUsers: (
    workspaceId: number,
    accountId:number,
    user: IToken,
    members: IMember[]
  ) => Promise<IMember>;
  validateGetMembers: (workspaceId: number, user: IToken) => Promise<IAccountWorkspace[]>; 
  insertValidations: (email: string, members: IMember[], user: IToken) => Promise<number>;
  removeValidations: (
    workspaceId: number,
    user: IToken,
    members: IMember[],
    email?: string,
    ) => Promise<number>;
}