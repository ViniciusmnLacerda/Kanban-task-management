import axios, { AxiosError } from 'axios';
import { ICredentials, IUserData } from '../interfaces';

export default class HandleAPI {
  private urlBase: string;

  private account: string;

  private login: string;

  private register: string;

  constructor() {
    this.urlBase = 'http://localhost:3001';
    this.login = 'login';
    this.account = 'account';
    this.register = 'register';
  }

  public postLogin = async (credentials: ICredentials) => {
    try {
      const { data, status } = await axios
        .post(`${this.urlBase}/${this.login}`, credentials);
      return { data, status };
    } catch (err) {
      const errors = err as Error | AxiosError;
      if (axios.isAxiosError(errors)) {
        return { data: errors.response, status: errors.status };
      }
    }
  };

  public getAccount = async (id: number, token: string) => {
    try {
      const { data, status } = await axios.get(`${this.urlBase}/${this.account}/${id}`, {
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

  public postRegister = async (userData: IUserData) => {
    try {
      const { data, status } = await axios
        .post(`${this.urlBase}/${this.register}`, userData);

      return { data, status };
    } catch (err) {
      const errors = err as Error | AxiosError;
      if (axios.isAxiosError(errors)) {
        return { data: errors.response, status: errors.status };
      }
    }
  };
}
