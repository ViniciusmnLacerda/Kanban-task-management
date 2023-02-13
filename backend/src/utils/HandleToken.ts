import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import { IToken, IUser } from '../interfaces';

export default class HandleToken {
  private secret: jwt.Secret = process.env.JWT_SECRET || 'jwt_secret';
  private jwtConfig: jwt.SignOptions = {
    algorithm: 'HS256',
    expiresIn: '1d',
  }

  public createToken = ({ id, email }: IUser): IToken => {
    const token = jwt.sign({ id, email }, this.secret, this.jwtConfig);
    return token as unknown as IToken;
  }
};