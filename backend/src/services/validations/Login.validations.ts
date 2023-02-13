import userModel from '../../database/models/Users';
import { IUser } from '../../interfaces';
import { ErrorClient } from '../../utils';

export default class LoginValidation {
  public validateCreadentials = async ({ password, email }: IUser): Promise<void> => {
    const user = await userModel.findOne({
      where: { email },
    });

    if (!user) throw new ErrorClient(401, 'Incorrect email or password');

    // const isPasswordValid = await bcrypt.compare(password, user.password);

    // if (!isPasswordValid) throw new ErrorClient(401, 'Incorrect email or password');

  };
};