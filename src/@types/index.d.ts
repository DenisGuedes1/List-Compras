import * as express from "express";
import { Client } from "../interface";

declare global {
  namespace Express {
    interface Request {
      purchaseList: {
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
