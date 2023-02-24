import axios, { AxiosError } from 'axios';
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
}
