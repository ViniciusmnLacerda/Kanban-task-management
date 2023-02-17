import { Request, Response } from 'express';
import { MembersService } from '../services';
import { IMembersController } from './interfaces';

export default class MembersController implements IMembersController {
  constructor(private readonly service: MembersService) {
    this.service = service;
  }

  public getMembers = async (req: Request, res: Response): Promise<void> => {
    const { workspaceId } = req.params;
    const { user } = req.body;
    const members = await this.service.getMembers(+workspaceId, user);
    res.status(200).json(members);
  };

  public toggleAdmin = async (req: Request, res: Response): Promise<void> => {
    const { user } = req.body;
    const { workspaceId, accountId } = req.params;   
    await this.service.toggleAdmin(+workspaceId, +accountId, user);
    res.status(204).end();
  };

  public insert = async (req: Request, res: Response): Promise<void> => {
    const { email, admin, user } = req.body;
    const newMember = { email, admin };
    const { workspaceId } = req.params; 
    await this.service.insert(+workspaceId, newMember, user);
    res.status(204).end();
  };
}