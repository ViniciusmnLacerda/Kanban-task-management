import cardsColumnModel from '../database/models/CardsColumn';
import columnWorkspacesModel from '../database/models/ColumnWorkspace';
import { ICard, ICardColumn, IColumn, IToken } from '../interfaces';
import CardsService from './Cards.service';
import ColumnService from './Column.service';
import { INewColumnPosition, INewPosition } from './interfaces';
import { PositionValidations } from './validations';

export default class PositionService {
  constructor(
    private readonly columns: ColumnService,
    private readonly cards: CardsService,
    private readonly validations: PositionValidations,
    ) {
    this.columns = columns;
    this.cards = cards;
    this.validations = validations;
  }

  private setConditional = (
    direction: boolean,
    position:number,
    oldPosition: number,
    newPosition: number,
    ): boolean => {
    if (direction) return position >= oldPosition && position <= newPosition;
    return position <= oldPosition && position >= newPosition;
  };

  private shiftPosition = (
    array: IColumn[] | ICard[],
    direction: boolean,
    oldPosition: number,
    newPosition: number,
  ): IColumn[] | ICard[] => {
    const newArray = array.map((element) => {
      if (element.position === oldPosition) {
        const newElement = element;
        newElement.position = newPosition;
        return newElement;
      }
      if (this.setConditional(direction, element.position, oldPosition, newPosition)) {
        const newElement = element;
        newElement.position = direction ? element.position - 1 : element.position + 1;
        return newElement;
      }
      return element;
    }); return newArray as IColumn[] | ICard[];
  };

  private updateCards = async (
    cards: cardsColumnModel[],
    id: number,
  ): Promise<void> => {
    const updatePromises = cards.map(async (card: cardsColumnModel) => {
      await cardsColumnModel.update(
        { position: card.dataValues.position },
        { where: { columnId: id, cardId: card.dataValues.card.dataValues.cardId,
        } },
      );
    });

    await Promise.all(updatePromises);
  };

  private updateColumns = async (
    columns: columnWorkspacesModel[],
    id: number,
  ): Promise<void> => {
    const updatePromises = columns.map(async (column: columnWorkspacesModel) => {
      await columnWorkspacesModel.update(
        { position: column.dataValues.position },
        { where: { workspaceId: id, columnId: column.dataValues.column.dataValues.columnId } },
      );
    });

    await Promise.all(updatePromises);
  };

  private setOldCardPositions = (
    cardsPosition: ICardColumn[],
    oldPosition: number,
): ICardColumn[] => {
    const newCardsPosition = cardsPosition.map((card) => {
      if (card.position > oldPosition) {
        const newCard = {
          cardId: card.cardId,
          columnId: card.columnId,
          position: card.position - 1,
        };
        return newCard;
      } return card;
    });    
    return newCardsPosition.sort((a, b) => a.position - b.position);
  };

  private setNewCardPositions = (
    cardsPosition: ICardColumn[],
    newPosition: number,
): ICardColumn[] => {
    const newCardsPosition = cardsPosition.map((card) => {
      if (card.position >= newPosition) {
        const newCard = {
          cardId: card.cardId,
          columnId: card.columnId,
          position: card.position + 1,
        };
        return newCard;
      } return card;
    });
    return newCardsPosition.sort((a, b) => a.position - b.position);
  };

  private updateOldColumn = async (
    oldCardsPosition: ICardColumn[],
    cardId: number,
    oldColumnId: number,
): Promise<void> => {
    await cardsColumnModel.destroy({ where: { cardId, columnId: oldColumnId } });
    const updatePromises = oldCardsPosition.map(async (card) => {
      await cardsColumnModel.update(
        { position: card.position },
        { where: { cardId: card.cardId, columnId: card.columnId } },
);
    });
    await Promise.all(updatePromises);
  };

  private updaNewColumn = async (
    newCards: ICardColumn[],
    newPosition: number,
    id: number,
    newColumnId: number,
): Promise<void> => {
    const cardsTobeUpdated = newCards.filter(({ position }) => position >= newPosition);
    const updatePromises = cardsTobeUpdated.map(async ({ cardId, columnId, position }) => {
      await cardsColumnModel.update({ position }, { where: { cardId, columnId } });
    });
    await Promise.all(updatePromises);
    await cardsColumnModel.create({ cardId: id, position: newPosition, columnId: newColumnId });
  }; 

  public updateInside = async (
    { id, direction, oldPosition, newPosition, database }: Omit<INewPosition, 'cardId'>,
    user: IToken,
  ): Promise<void> => {
    this.validations.validateDatabase(database);

    const array = database === 'columns' 
    ? await this.columns.getter(id, user)
    : await this.cards.getter(id, user);
    
    this.validations.validatePositions(array, oldPosition, newPosition);
    const newArray = this.shiftPosition(array, direction, oldPosition, newPosition);
    
    if (database === 'columns') {
      await this.updateColumns(newArray as unknown as columnWorkspacesModel[], id);
    } else await this.updateCards(newArray as unknown as cardsColumnModel[], id);
  };

  public updateOutside = async ({ 
    oldColumnId,
    newColumnId, 
    newPosition,
    oldPosition,
    cardId,
  }: INewColumnPosition): Promise<void> => {
    const newColumnPositions = await cardsColumnModel.findAll({ 
      where: { columnId: newColumnId },
      raw: true,
    }) as unknown as ICardColumn[];
    const oldColumnPositions = await cardsColumnModel.findAll({ 
      where: { columnId: oldColumnId },
      raw: true,
    }) as unknown as ICardColumn[];

    const newCardsPosition = this.setNewCardPositions(newColumnPositions, newPosition); 
    const oldCardsPosition = this.setOldCardPositions(oldColumnPositions, oldPosition);
    
    await this.updateOldColumn(oldCardsPosition, cardId, oldColumnId);  
    await this.updaNewColumn(newCardsPosition, newPosition, cardId, newColumnId);
  };
}