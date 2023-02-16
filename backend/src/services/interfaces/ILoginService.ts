import { ILogin, IUser } from '../../interfaces';

export default interface ILoginService {
 login: (credentials: IUser) => Promise<ILogin>
};