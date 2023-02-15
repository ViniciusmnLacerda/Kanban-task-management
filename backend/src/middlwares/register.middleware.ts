import { NextFunction, Request, Response } from 'express';
import { ErrorClient, Schemas } from '../utils';

const registerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const userData = req.body;
  const { error } = Schemas.registerSchema.validate(userData);
  if (error) throw new ErrorClient(400, 'Some required fields are missing');
  next();
};

export default registerMiddleware;