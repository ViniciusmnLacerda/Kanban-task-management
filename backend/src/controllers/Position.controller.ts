import { Request, Response } from 'express';
import { PositionService } from '../services';

export default class PositionController {
  constructor(private readonly service: PositionService) {
    this.service = service;
  }

  public updateInside = async (req: Request, res: Response): Promise<void> => {
    const { id, database } = req.params;
    const { newPosition, oldPosition, user } = req.body;
    const params = {
      id: +id,
      direction: newPosition > oldPosition,
      oldPosition,
      newPosition,
      database,
    };

    await this.service.updateInside(params, user);
    res.status(201).end();
  };
}