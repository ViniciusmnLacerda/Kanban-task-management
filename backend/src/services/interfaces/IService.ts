import { IToken } from '../../interfaces';

export interface IserviceReader<T, U> {
  getter: (arg0: U, arg1?: IToken) => Promise<T>
}

export interface IServiceWriter<T, U> {
  setter: (arg0: U) => Promise<T>
}

export default interface Iservice<T, E, U> {
  getAll: (arg0: number, arg1: IToken) => Promise<T>;
  create: (arg0: U, arg1: E, arg2: IToken) => Promise<void>;
  remove: (arg0: number, arg1: IToken, arg2?: string) => Promise<void> 
  update: (arg0: number, arg1: U, arg2: IToken) => Promise<void>;
}