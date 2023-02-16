import { Request, Response } from 'express';
import { RegisterService } from '../services';
import { IRegisterController } from './interfaces';

export default class RegisterController implements IRegisterController {
  constructor(private readonly service: RegisterService) {
    this.service = service;
  }

  public register = async (req: Request, res: Response): Promise<void> => {
    const userData = req.body;
    const newUser = await this.service.register(userData);
    res.status(201).json(newUser);
  };
}