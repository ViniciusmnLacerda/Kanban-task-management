import { NextFunction, Request, Response } from 'express';
import { ErrorClient, Schemas } from '../utils';

const updateWorkspacesMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const { name } = req.body;
  const { error } = Schemas.updateWorkspacesSchema.validate({ name });
  if (error) throw new ErrorClient(400, 'Some required fields are missing');
  next();
};

export default updateWorkspacesMiddleware;