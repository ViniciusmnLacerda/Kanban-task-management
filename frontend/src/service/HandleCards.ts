import axios, { AxiosError } from 'axios';
import { INewCard, IRemove, IUpdate } from './interfaces';

export default class HandleCards {
  private urlBase: string;

  private cards: string;

  constructor() {
    this.urlBase = 'http://localhost:3001';
    this.cards = 'cards';
  }

  public create = async ({ title, content, columnId }: INewCard, token: string) => {
    try {
      const { status } = await axios.post(
        `${this.urlBase}/${this.cards}/${columnId}`,
        { title, content },
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

  public getter = async (columnId: number, token: string) => {
    try {
      const { data, status } = await axios.get(
        `${this.urlBase}/${this.cards}/${columnId}`,
        {
          headers: {
            authorization: token,
          },
        },
      );
      return { data, status };
    } catch (err) {
      const errors = err as Error | AxiosError;
      if (axios.isAxiosError(errors)) {
        return { data: errors.response, status: errors.status };
      }
    }
  };

  public remove = async ({ id, key }: IRemove, token: string) => {
    try {
      const { status } = await axios.delete(
        `${this.urlBase}/${this.cards}/${id}/${key}`,
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

  public update = async (
    { id, title, content }: Omit<IUpdate, 'key'>,
    token: string,
  ) => {
    try {
      const { status } = await axios.patch(
        `${this.urlBase}/${this.cards}/${id}`,
        { title, content },
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
