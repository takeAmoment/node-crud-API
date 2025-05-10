import { IFailedResponse, ISuccessResponse, IUser } from '../types/types';
import { ResponseMessagesEnum, StatusCodesEnum } from '../types/enums';
import { User } from './User';

const users: Array<IUser> = [];
users.push(new User({ username: 'Waria', age: 45, hobbies: [] }));

export class DataController {
  public users: Array<IUser>;

  constructor() {
    this.users = users;
  }

  findUserById(id: string): IUser | undefined {
    return this.users.find((user) => user.id === id);
  }

  async getAllUsers(): Promise<ISuccessResponse<Array<IUser>>> {
    const result: ISuccessResponse<Array<IUser>> = {
      code: StatusCodesEnum.OK,
      data: this.users,
    };
    return result;
  }

  getUserById(id: string): Promise<ISuccessResponse<IUser>> {
    return new Promise((resolve, reject) => {
      const user = this.findUserById(id);
      if (user) {
        const result: ISuccessResponse<IUser> = {
          code: StatusCodesEnum.OK,
          data: user,
        };
        resolve(result);
      } else {
        const error: IFailedResponse = {
          code: StatusCodesEnum.NOT_FOUND,
          message: ResponseMessagesEnum.USER_NOT_FOUND,
        };
        reject(error);
      }
    });
  }
}
