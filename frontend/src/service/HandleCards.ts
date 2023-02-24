import axios, { AxiosError } from 'axios';

export default class HandleCards {
  private urlBase: string;

  private cards: string;

  constructor() {
    this.urlBase = 'http://localhost:3001';
    this.cards = 'cards';
  }

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
}
