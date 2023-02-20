import cardsModel from '../database/models/Cards';
import cardsColumnModel from '../database/models/CardsCorlumn';
import { ICard, IToken } from '../interfaces';

export default class CardsService {
  public getter = async (columnId: number, _user: IToken): Promise<ICard[]> => {
    const cards = await cardsColumnModel.findAll({
      where: { columnId },
      attributes: ['position'],
      include: {
        model: cardsModel,
        as: 'card',
        attributes: [['id', 'cardId'], 'title', 'content'],
      },
    });
    return cards as unknown as ICard[];
  };
}