import { IMember, IToken } from '../../interfaces';

export default interface IMembersService {
  getMembers: (workspaceId: number, user: IToken) => Promise<IMember[]> ;
  toggleAdmin: (workspaceId: number, accountId: number, user: IToken) => Promise<void>;
}