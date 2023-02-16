import { IAccount, IToken } from '../../interfaces';

export default interface IAccountService {
  getAccount: (id: number, user: IToken) => Promise<IAccount>
}