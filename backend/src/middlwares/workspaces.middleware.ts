import { NextFunction, Request, Response } from 'express';
import { ErrorClient, Schemas } from '../utils';

const workspacesMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const { name, emails } = req.body;
  const { error } = Schemas.workspacesSchema.validate({ name, emails });
  if (error) throw new ErrorClient(400, 'Some required fields are missing');
  next();
};

export default workspacesMiddleware;