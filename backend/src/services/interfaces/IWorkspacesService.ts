import { IToken, IWorkspace } from '../../interfaces';

export default interface IWorkspacesService {
  getAll: (accountId: number, user: IToken) => Promise<IWorkspace[]>;
  create: (name: string, emails: string[], user: IToken) => Promise<void>;
  remove: (workspaceId: number, user: IToken) => Promise<void> 
  update: (workspaceId: number, name: string, user: IToken) => Promise<void>;
};