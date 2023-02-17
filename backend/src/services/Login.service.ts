import { ILogin, IUser } from '../interfaces';
import { HandleToken } from '../utils';
import { IserviceReader } from './interfaces/IService';
import { UserValidations } from './validations';

export default class LoginService implements IserviceReader<ILogin, IUser> {
  constructor(private readonly auth: HandleToken, private readonly validations: UserValidations) {
    this.auth = auth;
    this.validations = validations;
  }

  public getter = async (credentials: IUser): Promise<ILogin> => {
    const user = await this.validations.validateCreadentials(credentials);   
    const token = this.auth.createToken(user);
    const result = { token, id: user.id } as ILogin;
    return result;
  };
}