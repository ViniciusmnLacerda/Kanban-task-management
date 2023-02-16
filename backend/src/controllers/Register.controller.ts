import { Request, Response } from 'express';
import { RegisterService } from '../services';

export default class RegisterController {
  registerService: RegisterService;

  constructor() {
    this.registerService = new RegisterService();
  }

  public register = async (req: Request, res: Response) => {
    const userData = req.body;
    const newUser = await this.registerService.register(userData);
    res.status(201).json(newUser);
  };
}