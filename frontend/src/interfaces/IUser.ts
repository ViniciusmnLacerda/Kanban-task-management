export default interface IUser {
  id: number;
  accountId: number;
  name: string;
  email: string;
  lastName: string;
  image?: string;
  token: string;
};
