import columnModel from '../database/models/Column';
import columnWorkspacesModel from '../database/models/ColumnWorkspace';
import { IToken } from '../interfaces';
import { ColumnValidations } from './validations';

export default class ColumnService {
  constructor(private readonly validations: ColumnValidations) {
    this.validations = validations;
  }

  public getter = async (workspaceId: number, user: IToken) => {
    const columnIds = await columnWorkspacesModel.findAll({ 
      where: { workspaceId }, 
      attributes: ['columnId'], 
    });

    const columnsPromise = columnIds.map(async ({ columnId }) => {
      const column = await columnModel.findByPk(columnId, { 
        attributes: [['id', 'columnId'], 'title'],
      });

      return column;
    });
    
    const columns = await Promise.all(columnsPromise);

    return columns;
  };
}