import axios, { AxiosError } from 'axios';
import { INewPositionInside, INewPositionOutside } from './interfaces';

export default class HandlePosition {
  private urlBase: string;

  private position: string;

  constructor() {
    this.urlBase = 'http://localhost:3001';
    this.position = 'position';
  }

  public updateInside = async (
    { oldPosition, newPosition, id, database }: INewPositionInside,
    token: string,
  ) => {
    try {
      const { status } = await axios.patch(
        `${this.urlBase}/${this.position}/inside/${database}/${id}`,
        { oldPosition, newPosition },
        {
          headers: {
            authorization: token,
          },
        },
      );
      return { status };
    } catch (err) {
      const errors = err as Error | AxiosError;
      if (axios.isAxiosError(errors)) {
        return { data: errors.response, status: errors.status };
      }
    }
  };

  public updateOutside = async (
    { oldPosition, newPosition, id, oldColumnId, newColumnId }: INewPositionOutside,
    token: string,
  ) => {
    try {
      const { status } = await axios.patch(
        `${this.urlBase}/${this.position}/outside/${id}`,
        { oldPosition, newPosition, oldColumnId, newColumnId },
        {
          headers: {
            authorization: token,
          },
        },
      );
      return { status };
    } catch (err) {
      const errors = err as Error | AxiosError;
      if (axios.isAxiosError(errors)) {
        return { data: errors.response, status: errors.status };
      }
    }
  };
}
