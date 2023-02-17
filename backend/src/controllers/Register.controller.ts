import { Request, Response } from 'express';
import { RegisterService } from '../services';
import { IControllerWriter } from './interfaces/IController';

export default class RegisterController implements IControllerWriter {
  constructor(private readonly service: RegisterService) {
    this.service = service;
  }

  public create = async (req: Request, res: Response): Promise<void> => {
    const userData = req.body;
    const newUser = await this.service.create(userData);
    res.status(201).json(newUser);
  };
}