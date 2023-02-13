import { Request, Response } from 'express';
import { RegisterService } from '../services';

const registerService = new RegisterService();

export default class RegisterController {
  public register = async (req: Request, res: Response) => {
    const userData = req.body;
    const newUser = await registerService.register(userData);
    res.status(201).json(newUser);
  }
};