export default interface IUser {
  id: number;
  accountId: number;
  name: string;
  lastName: string;
  image?: string;
  token: string;
}