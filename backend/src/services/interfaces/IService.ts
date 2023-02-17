import { IToken } from '../../interfaces';

export default interface Iservice<R, C, U, N> {
  getAll: (arg0: number, arg1: IToken) => Promise<R[]>;
  create: (arg0: C, arg1: U, arg2: IToken) => Promise<R[] | void>;
  remove: (arg0: number, arg1: IToken, arg2?: N) => Promise<void> 
  update: (arg0: number, arg1: U, user: IToken) => Promise<void>;
};