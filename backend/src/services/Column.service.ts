import sequelize from '../database/models';
import columnModel from '../database/models/Column';
import columnWorkspacesModel from '../database/models/ColumnWorkspace';
import { IColumn, IToken } from '../interfaces';
import { ErrorClient } from '../utils';
import { INewColumn, IRemove, IService, IUpdate } from './interfaces';
import MembersService from './Members.service';

export default class ColumnService implements IService<IColumn[], INewColumn> {
  constructor(
    private readonly service: MembersService,
) {
    this.service = service;
  }

  public getter = async (workspaceId: number, user: IToken): Promise<IColumn[]> => {
    await this.service.getter(workspaceId, user);
    const columns = await columnWorkspacesModel.findAll({
      where: { workspaceId },
      attributes: ['position', 'workspaceId'],
      include: [
        {
          model: columnModel,
          as: 'column',
          attributes: [['id', 'columnId'], 'title'],
        },
      ],
    }) as unknown as IColumn[];
    return columns.sort((a, b) => a.position - b.position);
  };

  public create = async ({ workspaceId, title }: INewColumn, user: IToken): Promise<void> => {
    await this.service.getter(workspaceId, user);
    const columns = await this.getter(workspaceId, user);
    try {
      await sequelize.transaction(async (t) => {
        const { id: columnId } = await columnModel.create({ title }, { transaction: t });
        await columnWorkspacesModel.create(
          { workspaceId, columnId, position: columns.length }, 
          { transaction: t },
          );
      });
    } catch (err) {
      throw new ErrorClient(500, 'Internal server error');
    }
  };

  public remove = async (
    { id: columnId, key: workspaceId }: Omit<IRemove, 'email'>,
    user: IToken,
  ): Promise<void> => {
    await this.service.getter(workspaceId, user);
    try {
      await sequelize.transaction(async (t) => {
        await columnWorkspacesModel.destroy({ where: { workspaceId, columnId }, transaction: t });
        await columnModel.destroy({ where: { id: columnId }, transaction: t });
      });
    } catch (err) {
      throw new ErrorClient(500, 'Internal server error');
    }
  };
  
  public update = async (
    { id, title }: Omit<IUpdate, 'content' | 'key'>, 
    _user: IToken,
): Promise<void> => {
  await columnModel.update({ title }, { where: { id } });
};
}