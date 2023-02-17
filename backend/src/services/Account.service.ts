import accountModel from '../database/models/Accounts';
import { IAccount, IToken } from '../interfaces';
import { ErrorClient } from '../utils';
import { IServiceReader } from './interfaces/IService';

export default class AccountService implements IServiceReader<IAccount, number> {
  public getter = async (id: number, user: IToken | undefined): Promise<IAccount> => {
    if (user?.userId !== id) throw new ErrorClient(401, 'Unauthorized');
    const account = await accountModel.findByPk(id);
    if (!account) throw new ErrorClient(404, 'Account not found');
    return account;
  };
}