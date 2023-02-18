import { IMember, IToken } from '../../interfaces';
import { ErrorClient } from '../../utils';

export default class ColumnValidations {
  public validateMember = (members: IMember[], { userId }: IToken): void => {
    const isMember = members.find(({ accountId }) => accountId === userId);
    if (!isMember) throw new ErrorClient(404, 'User is not member');
  };
}
