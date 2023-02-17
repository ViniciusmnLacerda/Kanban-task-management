import { Request, Response } from 'express';

export default interface ILoginController {
  getter: (req: Request, res: Response) => Promise<void>
}