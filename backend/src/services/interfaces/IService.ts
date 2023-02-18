import { IToken } from '../../interfaces';

export interface IServiceReader<T, U> {
  getter: (arg0: U, arg1?: IToken) => Promise<T>
}

export interface IServiceWriter<T, U> {
  create: (arg0: U) => Promise<T>
}

export default interface Iservice<T, E, U, G> {
  getter: (arg0: number, arg1: IToken) => Promise<T>;
  create: (arg0: G, arg2: IToken) => Promise<void>;
  remove: (arg0: number, arg1: IToken, arg2?: string) => Promise<void> 
  update: (arg0: number, arg1: U, arg2: IToken) => Promise<void>;
}

// ESTOU ARRUMANDO O CREATE