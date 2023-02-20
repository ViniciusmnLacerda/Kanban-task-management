import { NextFunction, Request, Response } from 'express';
import { ErrorClient, Schemas } from '../utils';

const columnMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const { title } = req.body;
  const { error } = Schemas.columnSchema.validate({ title });
  if (error) throw new ErrorClient(400, 'Some required fields are missing');
  next();
};

export default columnMiddleware;