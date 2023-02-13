import { Request, Response } from 'express';
import { RegisterService } from '../services';

const registerService = new RegisterService();

export default class RegisterController {
  public register = async (req: Request, res: Response) => {
    const userData = req.body;
    await registerService.register(userData);
    res.sendStatus(201);
  }
};