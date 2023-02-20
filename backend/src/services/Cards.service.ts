import cardsModel from '../database/models/Cards';
import cardsColumnModel from '../database/models/CardsCorlumn';
import columnWorkspacesModel from '../database/models/ColumnWorkspace';
import { ICard, IToken } from '../interfaces';
import { MembersService } from '../services';

export default class CardsService {
  constructor(private readonly service: MembersService) {
    this.service = service;
  }

  public getter = async (workspaceId: number, user: IToken): Promise<ICard[][]> => {
    await this.service.getter(workspaceId, user);
    const columnIds = await columnWorkspacesModel.findAll({
       where: { workspaceId },
       attributes: ['columnId'],
      });
    
    const cardsPromise = columnIds.map(async ({ columnId }) => {
      const cards = await cardsColumnModel.findAll({ where: { columnId },
        attributes: ['columnId', 'position'],
        include: {
          model: cardsModel,
          as: 'card',
          attributes: [['id', 'cardId'], 'title', 'content'],
        },
      });
      return cards;
    });

    const cards = await Promise.all(cardsPromise);

    return cards as unknown as ICard[][];
  };
}