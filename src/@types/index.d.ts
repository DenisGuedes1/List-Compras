import * as express from "express";
import { Client } from "../interface";

declare global {
  namespace Express {
    interface Request {
      listIndex: {
        indexArrayClient: number;
      };
      validateClientList: {
        listName: string;
        data: [Client];
      };
    }
  }
}
export { express };
