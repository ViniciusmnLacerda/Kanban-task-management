import { IUser } from '../interfaces';
import { HandleToken } from '../utils';
import { UserValidations } from './validations';

export default class LoginService {
  handleToken: HandleToken;

  userValidations: UserValidations;

  constructor() {
    this.handleToken = new HandleToken();
    this.userValidations = new UserValidations();
  }

  public login = async (credentials: IUser) => {
    const user = await this.userValidations.validateCreadentials(credentials);   
    const token = this.handleToken.createToken(user);
    return { token, id: user.id };
  };
}