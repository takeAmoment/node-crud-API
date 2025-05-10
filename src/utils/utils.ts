import { USERS_URL } from '../constants/constants';
import { Router } from '../Router/Router';
import { HttpMethodsEnum } from '../types/enums';
import { IFindRouteProps } from '../types/types';

export const findRoute = ({ method, pathname, req, res }: IFindRouteProps) => {
  const router = new Router();

  switch (true) {
    case method === HttpMethodsEnum.GET && pathname === USERS_URL:
      router.get(req, res, true);
      break;
    case method === HttpMethodsEnum.GET && pathname.startsWith(USERS_URL):
      router.get(req, res, false);
      break;
    default:
      console.log(req.url);
  }
};
