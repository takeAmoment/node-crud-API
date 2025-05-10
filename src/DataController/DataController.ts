import { ISuccessResponse, IUser } from '../types/types';
import { StatusCodesEnum } from '../types/enums';

const users: Array<IUser> = [];

export class DataController {
  public users: Array<IUser>;

  constructor() {
    this.users = users;
  }

  async getAllUsers (): Promise<ISuccessResponse<Array<IUser>>>  {
    const result: ISuccessResponse<Array<IUser>> = { code: StatusCodesEnum.OK, data: this.users};
    return result;
  }
}