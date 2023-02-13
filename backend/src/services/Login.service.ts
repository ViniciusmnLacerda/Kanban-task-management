import { IToken, IUser } from "../interfaces";
import { HandleToken } from "../utils";

const handleToken = new HandleToken();

export default class LoginService {
  public login = async (credentials: IUser): Promise<IToken> => {
    const token = handleToken.createToken(credentials);
    return token;
  }
};