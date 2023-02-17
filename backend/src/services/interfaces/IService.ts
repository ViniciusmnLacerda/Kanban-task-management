import { IToken } from '../../interfaces';

export default interface Iservice<T, S, U> {
  getAll: (arg0: number, arg1: IToken) => Promise<T>;
  create: (arg0: string | number, arg1: U, arg2: IToken) => Promise<T | void>;
  remove: (arg0: number, arg1: IToken, arg2?: S) => Promise<void> 
  update: (arg0: number, arg1: string | number, user: IToken) => Promise<void>;
}