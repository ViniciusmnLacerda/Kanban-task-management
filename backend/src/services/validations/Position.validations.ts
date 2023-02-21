/* eslint-disable max-params */
import { ICard, ICardColumn, IColumn } from '../../interfaces';
import { ErrorClient } from '../../utils';

export default class PositionValidations {
  public validateDatabase = (database: string): void => {
    const isDatabaseValid = database === 'columns' || database === 'cards';
    if (!isDatabaseValid) throw new ErrorClient(400, 'Invalid database');
  };

  public validatePositions = (
    array: IColumn[] | ICard[],
    oldPosition: number,
    newPosition: number,
): void => {
    if (newPosition === oldPosition) throw new ErrorClient(400, 'Invalid positions');
    const isPositionsValid = newPosition <= array.length && oldPosition <= array.length;
    if (!isPositionsValid) throw new ErrorClient(400, 'Invalid positions');
  };

  public validateOutside = (
    cardId: number,
    oldPosition: number,
    newPosition: number,
    oldCardsPositions: ICardColumn[],
    newCardsPositions: ICardColumn[],
):void => {
    const isCardIdValid = oldCardsPositions.find((card) => card.cardId === cardId);
    if (!isCardIdValid) throw new ErrorClient(400, 'Invalid cardId');
    if (isCardIdValid.position !== oldPosition) throw new ErrorClient(400, 'Invalid oldPosition');
    if (newPosition > newCardsPositions.length) throw new ErrorClient(400, 'Invalid newPosition');
  };
}