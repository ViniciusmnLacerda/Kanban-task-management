import { Request, Response } from 'express';
import { PeopleService } from '../services';
import { IControllerReader } from './interfaces/IController';

export default class PeopleController implements IControllerReader {
  constructor(private readonly service: PeopleService) {
    this.service = service;
  }

  public getter = async (req: Request, res: Response): Promise<void> => {
    const { accountId } = req.params;
    const people = await this.service.getter(+accountId);
    res.status(200).json(people);
  };
}