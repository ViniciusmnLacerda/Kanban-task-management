export default interface IToken {
  userId: number;
  email: string;
  iat: number;
  exp: number;
  id?: number;
}