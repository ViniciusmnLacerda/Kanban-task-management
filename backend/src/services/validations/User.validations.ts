import { compareSync } from 'bcryptjs';
import userModel from '../../database/models/Users';
import { IUser } from '../../interfaces';
import { ErrorClient } from '../../utils';

export default class UserValidation {
  private findUser = async (email: string): Promise<IUser> => {
    const user = await userModel.findOne({ where: { email }});
    return user as IUser;
  }

  public validateCreadentials = async ({ password, email }: IUser): Promise<IUser> => {
    const user = await this.findUser(email);
    if (!user) throw new ErrorClient(401, 'Incorrect email or password');

    const isPasswordValid = compareSync(password as string, user.password);
    
    if (!isPasswordValid) throw new ErrorClient(401, 'Incorrect email or password');

    return user;
  };

  public validateEmail = async (email: string): Promise<void> => {
    const user = await this.findUser(email);
    if (user) throw new ErrorClient(422, 'E-mail is already in used');
  }
};