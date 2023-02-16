import { Request, Response } from 'express';

export default interface IWorkspacesController {
   getAll: (req: Request, res: Response) => Promise<void>;
   create: (req: Request, res: Response) => Promise<void>;
   delete: (req: Request, res: Response) => Promise<void>;
};