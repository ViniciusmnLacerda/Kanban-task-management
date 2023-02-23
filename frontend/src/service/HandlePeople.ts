import axios, { AxiosError } from 'axios';

export default class HandlePeople {
  private urlBase: string;

  private people: string;

  constructor() {
    this.urlBase = 'http://localhost:3001';
    this.people = 'people';
  }

  public getter = async (id: number, token: string) => {
    try {
      const { data, status } = await axios.get(`${this.urlBase}/${this.people}/${id}`, {
        headers: {
          authorization: token,
        },
      });
      return { data, status };
    } catch (err) {
      const errors = err as Error | AxiosError;
      if (axios.isAxiosError(errors)) {
        return { data: errors.response, status: errors.status };
      }
    }
  };
}
