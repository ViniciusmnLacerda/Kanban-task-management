import { Request, Response } from 'express';
import { PositionService } from '../services';

export default class PositionController {
  constructor(private readonly service: PositionService) {
    this.service = service;
  }

  public update = async (req: Request, res: Response): Promise<void> => {
    const { id, database } = req.params;
    const { newPosition, oldPosition, user } = req.body;
    await this.service.update(
{ 
      id: +id,
      direction: newPosition > oldPosition,
      oldPosition,
      newPosition,
      database,
    },
    user,
);

    res.status(201).end();
  };
}