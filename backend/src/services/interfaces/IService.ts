import { IToken } from '../../interfaces';
import IRemove from './IRemove';
import IUpdate from './IUpdate';

export interface IServiceReader<T, U> {
  getter: (arg0: U, arg1?: IToken) => Promise<T>
}

export interface IServiceWriter<T, U> {
  create: (arg0: U) => Promise<T>
}

export default interface Iservice<T, U> {
  getter: (arg0: number, arg1: IToken) => Promise<T>;
  create: (arg0: U, arg2: IToken) => Promise<void>;
  remove: (arg0: IRemove, arg1: IToken) => Promise<void> 
  update: (arg0: IUpdate, arg2: IToken) => Promise<void>;
};
