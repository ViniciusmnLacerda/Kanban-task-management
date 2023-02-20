import cardsColumnModel from '../database/models/CardsColumn';
import columnWorkspacesModel from '../database/models/ColumnWorkspace';
import { ICard, IColumn, IToken } from '../interfaces';
import CardsService from './Cards.service';
import ColumnService from './Column.service';
import { INewPosition } from './interfaces';
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

  public updateInside = async (
    { id, direction, oldPosition, newPosition, database }: INewPosition,
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
}