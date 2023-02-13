import { Request, Response } from 'express';
import { LoginService } from '../services';

const loginService = new LoginService();

export default class LoginController {
  public login = async (req: Request, res: Response): Promise<void> => {
    const credentials = req.body;
    const token = await loginService.login(credentials);
    res.status(200).json({ token });
  }
};