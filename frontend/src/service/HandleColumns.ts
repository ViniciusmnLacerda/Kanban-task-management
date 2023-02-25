import axios, { AxiosError } from 'axios';
import { IRemove } from '../interfaces';
import { INewColumn } from './interfaces';

export default class HandleColumns {
  private urlBase: string;

  private columns: string;

  constructor() {
    this.urlBase = 'http://localhost:3001';
    this.columns = 'columns';
  }

  public getter = async (workspaceId: number, token: string) => {
    try {
      const { data, status } = await axios.get(
        `${this.urlBase}/${this.columns}/${workspaceId}`,
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

  public create = async ({ title, workspaceId }: INewColumn, token: string) => {
    try {
      const { status } = await axios.post(
        `${this.urlBase}/${this.columns}/${workspaceId}`,
        { title },
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

  public remove = async ({ id, key }: Omit<IRemove, 'email'>, token: string) => {
    try {
      const { status } = await axios.delete(
        `${this.urlBase}/${this.columns}/${id}/${key}`,
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
