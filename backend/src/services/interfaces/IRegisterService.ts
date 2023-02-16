import { IAccount, IUserData } from '../../interfaces';

export default interface IRegisterService {
  register: (userData: IUserData) => Promise<IAccount>
};