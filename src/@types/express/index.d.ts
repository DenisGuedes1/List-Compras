import { Client } from "../../interface";
declare module "*";
declare global {
  namespace Express {
    interface Request {
      listIndex: {
        indexArrayClient: number;
      };
      validateClientList: {
        id: number;
        listName: string;
        data: [Client];
      };
    }
  }
}
