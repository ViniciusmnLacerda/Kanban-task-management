import axios, { AxiosError } from 'axios';

export default class HandleWorkspaces {
  private urlBase: string;

  private workspaces: string;

  constructor() {
    this.urlBase = 'http://localhost:3001';
    this.workspaces = 'workspaces';
  }

  public getter = async (accountId: number, token: string) => {
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

  public update = async (workspaceId: number, title: string, token: string) => {
    try {
      const { status } = await axios.patch(
        `${this.urlBase}/${this.workspaces}/${workspaceId}`,
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
