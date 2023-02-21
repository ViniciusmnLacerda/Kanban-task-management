import { ICard, IColumn } from '../../interfaces';
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
}