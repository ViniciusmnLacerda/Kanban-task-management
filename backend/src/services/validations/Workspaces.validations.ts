import userModel from '../../database/models/Users';
import { IMember, IToken } from '../../interfaces';
import { ErrorClient } from '../../utils';

export default class WorkspacesValidations {
  public validateUsers = async (emails: string[], user: IToken) => {
    if (emails[0] !== user.email) throw new ErrorClient(401, 'Unauthorized');
    const users = await Promise.all(emails.map(async (email) => {
      const account = await userModel.findOne({ where: { email }, attributes: ['id'] });
      if (!account) throw new ErrorClient(404, 'User not found');
      return account;
    }));
    return users;
  };

  public deleteValidations = (members: IMember[], { userId }:IToken) => {
    const isMember = members.find(({ accountId }) => accountId === userId);
    if (!isMember || !isMember.admin) throw new ErrorClient(401, 'Unauthorized');
  };
}