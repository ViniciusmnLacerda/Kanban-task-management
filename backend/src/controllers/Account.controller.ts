import { Request, Response } from 'express';
import { AccountService } from '../services';
import { IControllerReader } from './interfaces/IController';

export default class AccountController implements IControllerReader {
  constructor(private readonly service: AccountService) {
    this.service = service;
  }

  public getter = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { user } = req.body;
    const account = await this.service.getter(+id, user);
    res.status(200).json(account);
  };
}