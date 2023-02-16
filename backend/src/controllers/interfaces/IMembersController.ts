import { Request, Response } from 'express';

export default interface IMembersController {
  getMembers: (req: Request, res: Response) => Promise<void> 
  toggleAdmin: (req: Request, res: Response) => Promise<void> 
};