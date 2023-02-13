import { genSaltSync, hashSync } from 'bcryptjs';
import sequelize from '../database/models';
import accountModel from '../database/models/Accounts';
import userModel from '../database/models/Users';
import { IAccount, IUserData } from '../interfaces';
import { ErrorClient } from '../utils';
import { UserValidations } from './validations';

const userValidations = new UserValidations();

export default class RegisterService {
  public register = async ({ email, password, name, lastName }: IUserData): Promise<IAccount> => {
    await userValidations.validateEmail(email);
    try {
      const result = await sequelize.transaction(async (t) => {
        const salt = genSaltSync(10);
        const hash = hashSync(password, salt);
        const { id } = await userModel.create({ email, password: hash });
        const user = await accountModel.create({ accountId: id, name, lastName});
        return user;
      })

      return result
    } catch (err) {
      throw new ErrorClient(500, 'Internal server error');
    }

  }
}