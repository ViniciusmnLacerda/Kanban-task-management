import { Request, Response } from 'express';

export default interface IMembersController {
  getMembers: (req: Request, res: Response) => Promise<void> 
  toggleAdmin: (req: Request, res: Response) => Promise<void> 
  insert: (req: Request, res: Response) => Promise<void> 
  remove: (req: Request, res: Response) => Promise<void> 
}