import axios, { AxiosError } from 'axios';

export default class HandleMembers {
  private urlBase: string;

  private members: string;

  constructor() {
    this.urlBase = 'http://localhost:3001';
    this.members = 'members';
  }

  public update = async (
    accountId: number,
    workspaceId:number,
    token: string,
  ) => {
    try {
      const { status } = await axios.patch(
        `${this.urlBase}/${this.members}/${workspaceId}/${accountId}`,
        {},
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
