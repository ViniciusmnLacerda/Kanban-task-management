import { Request, Response } from 'express';
import { CardsService } from '../services';

export default class CardsController {
  constructor(private readonly service: CardsService) {
    this.service = service;
  }

  public getter = async (req: Request, res: Response): Promise<void> => {
    const { workspaceId } = req.params;
    const { user } = req.body;
    const cards = await this.service.getter(+workspaceId, user);
    res.status(200).json(cards);
  };
}