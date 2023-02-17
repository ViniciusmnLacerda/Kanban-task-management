import { Request, Response } from 'express';
import { WorkspacesService } from '../services';
import { IWorkspacesController } from './interfaces';

export default class WorkspacesController implements IWorkspacesController {
  constructor(private readonly service: WorkspacesService) {
    this.service = service;
  }

  public getAll = async (req: Request, res: Response): Promise<void> => {
    const { accountId } = req.params;
    const { user } = req.body;
    const workspaces = await this.service.getAll(+accountId, user);
    res.status(200).json(workspaces);
  };

  public create = async (req: Request, res: Response): Promise<void> => {
    const { name, emails, user } = req.body;
    const workspaces = await this.service.create(name, emails, user);
    res.status(201).json(workspaces);
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    const { workspaceId } = req.params;
    const { user } = req.body;
    await this.service.delete(+workspaceId, user);
    res.status(204).end();
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    const { name, user } = req.body;
    const { workspaceId } = req.params;   
    await this.service.update(+workspaceId, name, user);
    res.status(204).end();
  };
}