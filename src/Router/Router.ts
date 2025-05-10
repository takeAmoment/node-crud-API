import { IncomingMessage, ServerResponse } from 'http';
import { DataController } from '../DataController/DataController';
import { sendResponse } from '../utils/sendResponse';

export class Router {
  public dataController: DataController;

  constructor() {
    this.dataController = new DataController();
  }

  async get (req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
    try {
      const result = await this.dataController.getAllUsers();
      sendResponse({ code: result.code, data: result.data, res});
    } catch (error) {
      console.error(error);
    }
  }
}