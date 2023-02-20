import { NextFunction, Request, Response } from 'express';
import { ErrorClient, Schemas } from '../utils';

const cardsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const { title, content } = req.body;
  const { error } = Schemas.cardsSchema.validate({ title, content });
  if (error) throw new ErrorClient(400, 'Some required fields are missing');
  next();
};

export default cardsMiddleware;