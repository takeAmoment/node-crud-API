import { USERS_URL } from '../constants/constants';
import { DataController } from '../DataController/DataController';
import { Router } from '../Router/Router';
import {
  HttpMethodsEnum,
  ResponseMessagesEnum,
  StatusCodesEnum,
} from '../types/enums';
import { IFindRouteProps} from '../types/types';
import { sendResponse } from './sendResponse';

const checkIsMatch = (url: string) => /^\/api\/users\/([a-zA-Z0-9]+)/.test(url);

export const findRoute = ({ method, pathname, req, res, users }: IFindRouteProps) => {
  const dataController = new DataController(users);
  const router = new Router(dataController);

  switch (true) {
    case method === HttpMethodsEnum.GET && pathname === USERS_URL:
      router.get(req, res, true);
      break;
    case method === HttpMethodsEnum.GET && checkIsMatch(pathname):
      router.get(req, res, false);
      break;
    case method === HttpMethodsEnum.POST && pathname === USERS_URL:
      router.post(req, res);
      break;
    case method === HttpMethodsEnum.PUT && checkIsMatch(pathname):
      router.put(req, res);
      break;
    case method === HttpMethodsEnum.DELETE && checkIsMatch(pathname):
      router.delete(req, res);
      break;
    default:
      sendResponse({
        code: StatusCodesEnum.NOT_FOUND,
        data: { message: ResponseMessagesEnum.WRONG_URL },
        res,
      });
  }
};
