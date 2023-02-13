import sequelize from '../database/models';
import accountModel from '../database/models/Accounts';
import userModel from '../database/models/Users';
import { IUserData } from '../interfaces';
import { ErrorClient } from '../utils';

export default class RegisterService {
  public register = async ({email, password, name, lastName}: IUserData) => {
    try {
      const result = await sequelize.transaction(async (t) => {
        const { id } = await userModel.create({ email, password});
        await accountModel.create({ accountId: id, name, lastName});
      })
    } catch (err) {
      throw new ErrorClient(500, 'Internal server error');
    }
  }
};