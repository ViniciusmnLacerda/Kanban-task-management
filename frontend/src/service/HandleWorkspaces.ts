import axios, { AxiosError } from 'axios';

export default class HandleWorkspaces {
  private urlBase: string;

  private workspaces: string;

  constructor() {
    this.urlBase = 'http://localhost:3001';
    this.workspaces = 'workspaces';
  }

  public get = async (accountId: number, token: string) => {
    try {
      const { data, status } = await axios.get(
        `${this.urlBase}/${this.workspaces}/${accountId}`,
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
