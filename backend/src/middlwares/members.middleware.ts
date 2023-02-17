import { NextFunction, Request, Response } from 'express';
import { ErrorClient, Schemas } from '../utils';

const membersMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const { admin, email } = req.body;
  const { error } = Schemas.membersSchema.validate({ admin, email });
  if (error) throw new ErrorClient(400, 'Some required fields are missing');
  next();
};

export default membersMiddleware;