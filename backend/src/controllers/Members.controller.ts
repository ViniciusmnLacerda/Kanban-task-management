import { Request, Response } from 'express';
import { MembersService } from '../services';

const membersService = new MembersService();

export default class MembersController {
  public getMembers = async (req: Request, res: Response) => {
    const { workspaceId } = req.params;
    const members = await membersService.getMembers(+workspaceId);
    res.status(201).json(members);
  };
}