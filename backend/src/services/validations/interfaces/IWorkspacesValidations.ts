import { IMember, IToken, IUser } from '../../../interfaces';

export default interface IWorkspacesValidations {
  validateUsers: (emails: string[], user: IToken) => Promise<IUser[]>;
  deleteValidations: (members: IMember[], user:IToken) => void;
}