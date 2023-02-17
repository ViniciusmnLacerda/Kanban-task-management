import { genSaltSync, hashSync } from 'bcryptjs';
import sequelize from '../database/models';
import accountModel from '../database/models/Accounts';
import userModel from '../database/models/Users';
import { IAccount, IUserData } from '../interfaces';
import { ErrorClient } from '../utils';
import { IServiceWriter } from './interfaces/IService';
import { UserValidations } from './validations';

export default class RegisterService implements IServiceWriter<IAccount, IUserData> {
  constructor(private readonly validations: UserValidations) {
    this.validations = validations;
  }

  public create = async ({ email, password, name, lastName }: IUserData): Promise<IAccount> => {
    await this.validations.validateEmail(email);
    try {
      const result = await sequelize.transaction(async (t) => {
        const salt = genSaltSync(10);
        const hash = hashSync(password, salt);
        const { id } = await userModel.create({ email, password: hash }, { transaction: t });
        const user = await accountModel.create({ userId: id, name, lastName }, { transaction: t });
        return user;
      });

      return result;
    } catch (err) {
      throw new ErrorClient(500, 'Internal server error');
    }
  };
}