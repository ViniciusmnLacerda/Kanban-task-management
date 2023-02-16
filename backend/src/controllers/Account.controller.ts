import { Request, Response } from 'express';
import { AccountService } from '../services';
import { IAccountController } from './interfaces';

export default class AccountController implements IAccountController {
  constructor(private readonly service: AccountService) {
    this.service = service;
  }

  public getAccount = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { user } = req.body;
    const account = await this.service.getAccount(+id, user);
    res.status(200).json(account);
  };
}