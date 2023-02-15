import { NextFunction, Request, Response } from 'express';
import { ErrorClient, Schemas } from '../utils';

const loginMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const credentials = req.body;
  const { error } = Schemas.loginSchema.validate(credentials);
  if (error) throw new ErrorClient(400, 'Some required fields are missing');
  next();
};

export default loginMiddleware;