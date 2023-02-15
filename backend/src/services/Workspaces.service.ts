import accountWorkspacesModel from '../database/models/AccountWorkspaces';
import workspacesModel from '../database/models/Workspaces';
import { IToken, IWorkspace } from '../interfaces';
import { ErrorClient } from '../utils';

export default class WorkspacesService {
  public getAll = async (accountId: number, { userId }: IToken): Promise<IWorkspace[]> => {
    if (userId !== accountId) throw new ErrorClient(401, 'Unauthorized');
    const workspaces = await accountWorkspacesModel.findAll({
      where: { accountId },
      attributes: ['workspaceId'],
      include: [
        {
          model: workspacesModel,
          as: 'workspace',
          attributes: ['name', 'createdAt', 'lastUpdate'],
        },
      ],
    });
    return workspaces as unknown as IWorkspace[];
  };
}