import columnModel from '../database/models/Column';
import columnWorkspacesModel from '../database/models/ColumnWorkspace';
import { ColumnValidations } from './validations';

export default class ColumnService {
  constructor(private readonly validations: ColumnValidations) {
    this.validations = validations;
  }

  public getter = async (workspaceId: number) => {
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
    return columns;
  };
}