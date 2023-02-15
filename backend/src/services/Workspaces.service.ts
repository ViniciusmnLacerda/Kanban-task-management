import accountWorkspacesModel from '../database/models/AccountWorkspaces';
import workspacesModel from '../database/models/Workspaces';
import { IToken } from '../interfaces';
import { ErrorClient } from '../utils';

export default class WorkspacesService {
  public getWorkspaces = async (accountId: number, { userId }: IToken) => {
    if (userId !== accountId) throw new ErrorClient(401, 'Unauthorized');
    const workspaces = await accountWorkspacesModel.findAll({
      where: { accountId },
      include: [
        {
          model: workspacesModel,
          as: 'workspace',
          attributes: ['name', 'createdAt', 'updatedAt'],
        },
      ],
    });
    return workspaces;
  };
}