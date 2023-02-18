import { Request, Response } from 'express';
import { ColumnService } from '../services';

export default class ColumnController {
  constructor(private readonly service: ColumnService) {
    this.service = service;
  }

  public getter = async (req: Request, res: Response): Promise<void> => {
    const { workspaceId } = req.params;
    const columns = await this.service.getter(+workspaceId);
    res.status(200).json(columns);
  };
}