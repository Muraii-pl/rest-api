export interface IAuthToken {
  id: number;
  username: string;
  password: string;
  expiryTime: Date;
}
