import { Request, Response } from 'express';
import { AccountService } from '../services';

const accountService = new AccountService();

export default class AccountController {
  public getAccount = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const user = req.body;
    const account = await accountService.getAccount(+id, user);
    res.status(200).json(account);
  };
}