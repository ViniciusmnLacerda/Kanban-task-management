import sequelize from '../database/models';
import columnModel from '../database/models/Column';
import columnWorkspacesModel from '../database/models/ColumnWorkspace';
import { IColumn, IToken } from '../interfaces';
import { ErrorClient } from '../utils';
import { INewColumn } from './interfaces';
import MembersService from './Members.service';
import { ColumnValidations } from './validations';

export default class ColumnService {
  constructor(
    private readonly service: MembersService,
    private readonly validations: ColumnValidations,
) {
    this.validations = validations;
    this.service = service;
  }

  public getter = async (workspaceId: number, user: IToken): Promise<IColumn[]> => {
    const members = await this.service.getter(workspaceId, user);
    this.validations.validateMember(members, user);
    const columns = await columnWorkspacesModel.findAll({
      where: { workspaceId },
      attributes: ['workspaceId'],
      include: [
        {
          model: columnModel,
          as: 'column',
          attributes: [['id', 'columnId'], 'title'],
        },
      ],
    });
    return columns as unknown as IColumn[];
  };

  public create = async ({ workspaceId, title }: INewColumn, user: IToken) => {
    const members = await this.service.getter(workspaceId, user);
    this.validations.validateMember(members, user);
    try {
      await sequelize.transaction(async (t) => {
        const { id: columnId } = await columnModel.create({ title }, { transaction: t });
        await columnWorkspacesModel.create({ workspaceId, columnId }, { transaction: t });
      });
    } catch (err) {
      throw new ErrorClient(500, 'Internal server error');
    }
  };
}