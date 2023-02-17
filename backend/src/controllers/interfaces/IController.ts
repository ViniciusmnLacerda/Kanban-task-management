import { Request, Response } from 'express';

export interface IControllerReader {
  getter: (req: Request, res: Response) => Promise<void>;
}

export interface IControllerWriter {
  create: (req: Request, res: Response) => Promise<void>;
  update?: (req: Request, res: Response) => Promise<void>;
}

export interface IControllerDelete {
  remove: (req: Request, res: Response) => Promise<void>;
}

export default interface IController extends 
  IControllerReader,
  IControllerWriter,
  IControllerDelete {}