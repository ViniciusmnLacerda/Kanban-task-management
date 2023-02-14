import { IUser } from "../interfaces";
import { HandleToken } from "../utils";
import { UserValidations } from "./validations";

const handleToken = new HandleToken();
const userValidations = new UserValidations();

export default class LoginService {
  public login = async (credentials: IUser) => {
    const user = await userValidations.validateCreadentials(credentials);   
    const token = handleToken.createToken(user);
    return { token, id: user.id };
  }
};