import sequelize from '../database/models';
import cardsModel from '../database/models/Cards';
import cardsColumnModel from '../database/models/CardsColumn';
import { ICard, IToken } from '../interfaces';
import { ErrorClient } from '../utils';
import { INewCard } from './interfaces';

export default class CardsService {
  public getter = async (columnId: number, _user: IToken): Promise<ICard[]> => {
    const cards = await cardsColumnModel.findAll({
      where: { columnId },
      attributes: ['position', 'columnId'],
      include: {
        model: cardsModel,
        as: 'card',
        attributes: [['id', 'cardId'], 'title', 'content'],
      },
    });
    return cards as unknown as ICard[];
  };

  public create = async ({ columnId, title, content }: INewCard, user: IToken): Promise<void> => {
    const cards = await this.getter(columnId, user);
    try {
      await sequelize.transaction(async (t) => {
        const { id: cardId } = await cardsModel.create({ title, content }, { transaction: t });
        await cardsColumnModel.create(
          { cardId, columnId, position: cards.length }, 
          { transaction: t },
          );
      });
    } catch (err) {
      throw new ErrorClient(500, 'Internal server error');
    }
  };
}