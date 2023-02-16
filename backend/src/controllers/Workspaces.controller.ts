import { Request, Response } from 'express';
import { WorkspacesService } from '../services';

export default class WorkspacesController {
  workspacesService: WorkspacesService;

  constructor() {
    this.workspacesService = new WorkspacesService();
  }

  public getAll = async (req: Request, res: Response): Promise<void> => {
    const { accountId } = req.params;
    const { user } = req.body;
    const workspaces = await this.workspacesService.getAll(+accountId, user);
    res.status(200).json(workspaces);
  };

  public create = async (req: Request, res: Response): Promise<void> => {
    const { name, emails, user } = req.body;
    const workspaces = await this.workspacesService.create(name, emails, user);
    res.status(201).json(workspaces);
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    const { workspaceId } = req.params;
    const { user } = req.body;
    await this.workspacesService.delete(+workspaceId, user);
    res.sendStatus(204);
  };
}