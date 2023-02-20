import { Request, Response } from 'express';
import { CardsService } from '../services';

export default class CardsController {
  constructor(private readonly service: CardsService) {
    this.service = service;
  }

  public getter = async (req: Request, res: Response): Promise<void> => {
    const { columnId } = req.params;
    const { user } = req.body;
    const cards = await this.service.getter(+columnId, user);
    res.status(200).json(cards);
  };

  public create = async (req: Request, res: Response): Promise<void> => {
    const { columnId } = req.params;
    const { user, title, content } = req.body;
    await this.service.create({ columnId: +columnId, title, content }, user);
    res.status(204).end();
  };

  public remove = async (req: Request, res: Response): Promise<void> => {
    const { cardId, columnId } = req.params;
    const { user } = req.body;
    await this.service.remove({ id: +cardId, key: +columnId }, user);
    res.status(204).end(); 
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    const { cardId } = req.params;
    const { user, title, content } = req.body;
    await this.service.update({ id: +cardId, title, content }, user);
    res.status(204).end();
  };
}