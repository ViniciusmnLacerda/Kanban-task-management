import { compareSync } from 'bcryptjs';
import userModel from '../../database/models/Users';
import { IUser } from '../../interfaces';
import { ErrorClient } from '../../utils';

export default class LoginValidation {
  public validateCreadentials = async ({ password, email }: IUser): Promise<IUser> => {
    const user = await userModel.findOne({
      where: { email },
    });

    if (!user) throw new ErrorClient(401, 'Incorrect email or password');

    const isPasswordValid = compareSync(password as string, user.password);
    
    if (!isPasswordValid) throw new ErrorClient(401, 'Incorrect email or password');

    return user;
  };
};