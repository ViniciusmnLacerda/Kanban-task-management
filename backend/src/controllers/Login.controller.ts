import { Request, Response } from 'express';
import { LoginService } from '../services';
import { IControllerReader } from './interfaces/IController';

export default class LoginController implements IControllerReader {
  constructor(private readonly service: LoginService) {
    this.service = service;
  }

  public getter = async (req: Request, res: Response): Promise<void> => {
    const credentials = req.body;
    const token = await this.service.getter(credentials);
    res.status(200).json(token);
  };
}