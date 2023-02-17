import { IMember, INewMember, IToken } from '../../interfaces';

export default interface IMembersService {
  getAll: (workspaceId: number, user: IToken) => Promise<IMember[]> ;
  update: (workspaceId: number, accountId: number, user: IToken) => Promise<void>;
  create: (workspaceId: number, newMember: INewMember, user: IToken) => Promise<void>;
  remove: (workspaceId: number, email: string, user: IToken) => Promise<void>;
};
