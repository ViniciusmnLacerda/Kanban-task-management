import { IMember, INewMember, IToken } from '../../interfaces';

export default interface IMembersService {
  getMembers: (workspaceId: number, user: IToken) => Promise<IMember[]> ;
  toggleAdmin: (workspaceId: number, accountId: number, user: IToken) => Promise<void>;
  insert: (workspaceId: number, newMember: INewMember, user: IToken) => Promise<void>;
  remove: (workspaceId: number, email: string, user: IToken) => Promise<void>;
};
