import userModel from '../../database/models/Users';
import { IMember, IToken, IUser } from '../../interfaces';
import { ErrorClient } from '../../utils';
import { IWorkspacesValidations } from './interfaces';

export default class WorkspacesValidations implements IWorkspacesValidations {
  public validateUsers = async (emails: string[], user: IToken): Promise<IUser[]> => {
    if (emails[0] !== user.email) throw new ErrorClient(401, 'Unauthorized');
    const users = await Promise.all(emails.map(async (email) => {
      const account = await userModel.findOne({ where: { email }, attributes: ['id'] });
      if (!account) throw new ErrorClient(404, 'User not found');
      return account;
    }));
    return users;
  };

  public deleteValidations = (members: IMember[], { userId }:IToken): void => {
    const isMember = members.find(({ accountId }) => accountId === userId);
    if (!isMember || !isMember.admin) throw new ErrorClient(401, 'Unauthorized');
  };
}