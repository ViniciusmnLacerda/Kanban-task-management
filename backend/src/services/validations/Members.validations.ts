import { IMember, IToken } from '../../interfaces';
import { ErrorClient } from '../../utils';

export default class MembersValidations {
  public validateUsers = async (
    workspaceId: number,
    accountId:number,
    user: IToken,
    members: IMember[],
): Promise<IMember> => {
    const isMember = members.find((member) => +member.accountId === user.userId);
    if (!isMember) throw new ErrorClient(401, 'Unauthorized');
    const isAdmin = isMember.admin === true;
    if (!isAdmin) throw new ErrorClient(401, 'Unauthorized');
    const isAccountValid = members.find((member) => +member.accountId === accountId);
    if (!isAccountValid) throw new ErrorClient(404, 'User not found');
    return isAccountValid;
  };
}