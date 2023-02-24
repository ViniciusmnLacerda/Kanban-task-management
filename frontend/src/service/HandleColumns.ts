import axios, { AxiosError } from 'axios';

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
}
