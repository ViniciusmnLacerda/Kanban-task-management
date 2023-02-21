import { NextFunction, Request, Response } from 'express';
import { ErrorClient, Schemas } from '../utils';

const outsideMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const { oldColumnId, newColumnId, newPosition, oldPosition } = req.body;
  const { error } = Schemas.outsideSchema.validate({ 
    oldColumnId,
    newColumnId,
    oldPosition,
    newPosition,
  });
  if (error) throw new ErrorClient(400, 'Some required fields are missing');
  next();
};

export default outsideMiddleware;