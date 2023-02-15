import accountModel from '../database/models/Accounts';
import { IAccount, IToken } from '../interfaces';
import { ErrorClient } from '../utils';

export default class AccountService {
  public getAccount = async (id: number, { userId }: IToken): Promise<IAccount> => {
    if (userId !== id) throw new ErrorClient(401, 'Unauthorized');
    const account = await accountModel.findByPk(id);
    if (!account) throw new ErrorClient(404, 'Account not found');
    return account;
  };
}