import { Request, Response } from 'express';

export default interface IAccountController {
  getAccount: (req: Request, res: Response) => Promise<void>
};