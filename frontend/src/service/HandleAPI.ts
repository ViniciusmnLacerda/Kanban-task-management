import axios, { AxiosError } from 'axios';
import { ICredentials } from '../interfaces';

export default class HandleAPI {
  private urlBase: string;

  private login: string;

  constructor() {
    this.urlBase = 'http://localhost:3001/';
    this.login = 'login';
  }

  public postLogin = async (credentials: ICredentials) => {
    try {
      const { data, status } = await axios
        .post(`${this.urlBase}${this.login}`, credentials);
      return { data, status };
    } catch (err) {
      const errors = err as Error | AxiosError;
      if (axios.isAxiosError(errors)) {
        return { data: errors.response, status: errors.status };
      }
    }
  };
}
