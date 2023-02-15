/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
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

  if (err instanceof JsonWebTokenError) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  console.log('err> ', err);
  
  return res.status(500).json({ message: 'Internal error' });
};

export default errorMiddleware;