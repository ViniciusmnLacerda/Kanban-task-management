import { Request, Response } from 'express';
import { LoginService } from '../services';

export default class LoginController {
  loginService: LoginService;

  constructor() {
    this.loginService = new LoginService();
  }

  public login = async (req: Request, res: Response): Promise<void> => {
    const credentials = req.body;
    const token = await this.loginService.login(credentials);
    res.status(200).json(token);
  };
}