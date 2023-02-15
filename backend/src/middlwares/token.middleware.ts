import { NextFunction, Request, Response } from 'express';
import { ErrorClient, HandleToken } from '../utils';

const handleToken = new HandleToken();
 
const tokenMiddleare = (req: Request, res: Response, next: NextFunction): void => {
  const { authorization: token } = req.headers;
  if (!token) throw new ErrorClient(401, 'Token not found');
  const user = handleToken.verifyToken(token);
  req.body = user;
  next();
};

export default tokenMiddleare;