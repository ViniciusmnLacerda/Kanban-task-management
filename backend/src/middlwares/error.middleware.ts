import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ErrorClient } from '../utils';

const errorMiddleware: ErrorRequestHandler = (
  err: ErrorRequestHandler,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response => {
  if (err instanceof ErrorClient) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  console.log('aqui: ', err);
  
  return res.status(500).json({ message: 'Internal error' });
};

export default errorMiddleware;