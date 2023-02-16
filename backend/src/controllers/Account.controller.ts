import { Request, Response } from 'express';
import { AccountService } from '../services';

export default class AccountController {
  accountService: AccountService;

  constructor() {
    this.accountService = new AccountService();
  }

  public getAccount = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { user } = req.body;
    const account = await this.accountService.getAccount(+id, user);
    res.status(200).json(account);
  };
}