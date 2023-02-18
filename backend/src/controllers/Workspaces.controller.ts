import { Request, Response } from 'express';
import { WorkspacesService } from '../services';
import IController from './interfaces/IController';

export default class WorkspacesController implements IController {
  constructor(private readonly service: WorkspacesService) {
    this.service = service;
  }

  public getter = async (req: Request, res: Response): Promise<void> => {
    const { accountId } = req.params;
    const { user } = req.body;
    const workspaces = await this.service.getter(+accountId, user);
    res.status(200).json(workspaces);
  };

  public create = async (req: Request, res: Response): Promise<void> => {
    const { title, emails, user } = req.body;
    await this.service.create({ title, emails }, user);
    res.status(201).end();
  };

  public remove = async (req: Request, res: Response): Promise<void> => {
    const { workspaceId } = req.params;
    const { user } = req.body;
    await this.service.remove({ id: +workspaceId }, user);
    res.status(204).end();
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    const { title, user } = req.body;
    const { workspaceId } = req.params;   
    await this.service.update({ id: +workspaceId, title }, user);
    res.status(204).end();
  };
}