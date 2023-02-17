import { Request, Response } from 'express';

export default interface IController {
  getAll: (req: Request, res: Response) => Promise<void>;
  create: (req: Request, res: Response) => Promise<void>;
  remove: (req: Request, res: Response) => Promise<void>;
  update: (req: Request, res: Response) => Promise<void>;
};