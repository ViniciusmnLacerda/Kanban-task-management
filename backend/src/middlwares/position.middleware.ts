import { NextFunction, Request, Response } from 'express';
import { ErrorClient, Schemas } from '../utils';

const positionMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const { oldPosition, newPosition } = req.body;
  const { error } = Schemas.loginSchema.validate({ oldPosition, newPosition });
  if (error) throw new ErrorClient(400, 'Some required fields are missing');
  next();
};

export default positionMiddleware;