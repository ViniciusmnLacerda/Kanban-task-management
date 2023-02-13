import { IToken, IUser } from "../interfaces";
import { HandleToken } from "../utils";
import { LoginValidations } from "./validations";

const handleToken = new HandleToken();
const loginValidations = new LoginValidations();

export default class LoginService {
  public login = async (credentials: IUser): Promise<IToken> => {
    const user = await loginValidations.validateCreadentials(credentials);
    const token = handleToken.createToken(user);
    return token;
  }
};