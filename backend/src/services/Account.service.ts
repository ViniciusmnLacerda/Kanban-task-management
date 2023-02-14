import accountModel from '../database/models/Accounts';
import { IAccount } from '../interfaces';
import { ErrorClient } from '../utils';

export default class AccountService {
  public getAccount = async (id: string): Promise<IAccount> => {
    const account = await accountModel.findByPk(id);
    if (!account) throw new ErrorClient(404, 'Account not found');
    return account;
  }
};