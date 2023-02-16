import { Request, Response } from 'express';
import { MembersService } from '../services';

export default class MembersController {
  membersService: MembersService;

  constructor() {
    this.membersService = new MembersService();
  }

  public getMembers = async (req: Request, res: Response): Promise<void> => {
    const { workspaceId } = req.params;
    const { user } = req.body;
    const members = await this.membersService.getMembers(+workspaceId, user);
    res.status(201).json(members);
  };

  public toggleAdmin = async (req: Request, res: Response): Promise<void> => {
    const { user } = req.body;
    const { workspaceId, accountId } = req.params;   
    const result = await this.membersService.toggleAdmin(+workspaceId, +accountId, user);
    res.status(204).json(result);
  };
}