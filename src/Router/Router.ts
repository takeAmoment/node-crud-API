import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import { validate } from 'uuid';

import { DataController } from '../DataController/DataController';
import { sendResponse } from '../utils/sendResponse';
import { ResponseMessagesEnum, StatusCodesEnum } from '../types/enums';
import { IFailedResponse } from '../types/types';

export class Router {
  public dataController: DataController;

  constructor() {
    this.dataController = new DataController();
  }

  findId(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
    const parsedUrl = parse(req.url || '', true);
    const pathname = parsedUrl.pathname;
    const id = pathname?.split('/')[3] || '';

    if (!id || !validate(id)) {
      sendResponse({
        code: StatusCodesEnum.BAD_REQUEST,
        data: { message: ResponseMessagesEnum.INVALID_ID },
        res,
      });
    }
    return id;
  }

  async get(
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>,
    isGettingAllUsers: boolean,
  ) {
    if (isGettingAllUsers) {
      const result = await this.dataController.getAllUsers();
      sendResponse({ code: result.code, data: result.data, res });
    }

    const userId = this.findId(req, res);
    try {
      const { code, data } = await this.dataController.getUserById(userId);
      sendResponse({ code, data, res });
    } catch (error) {
      const { code, message } = error as IFailedResponse;
      sendResponse({ code, data: { message }, res });
    }
  }
}
