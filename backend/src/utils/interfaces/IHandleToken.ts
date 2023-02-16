import { IToken, IUser } from '../../interfaces';

export default interface IHandleToken {
  createToken: (user: IUser) => IToken
  verifyToken: (token: string) => IToken
};
