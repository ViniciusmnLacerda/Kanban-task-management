import { IToken, IWorkspace } from '../../interfaces';

export default interface IWorkspacesService {
  getAll: (accountId: number, user: IToken) => Promise<IWorkspace[]>;
  create: (name: string, emails: string[], user: IToken) => Promise<IWorkspace[]>;
  delete: (workspaceId: number, user: IToken) => Promise<void> 
}