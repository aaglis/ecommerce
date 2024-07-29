import { IUserLogin } from "./user-login.interface";

export interface IUser extends IUserLogin {
  id?: number;
  name?: string | null;
}
