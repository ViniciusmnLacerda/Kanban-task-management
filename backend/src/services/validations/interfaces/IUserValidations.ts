import { IUser } from '../../../interfaces';

export default interface IUserValidations {
  findUser (email: string): Promise<IUser>;
  validateCreadentials (user: IUser): Promise<IUser>
  validateEmail (email: string): Promise<void>
};