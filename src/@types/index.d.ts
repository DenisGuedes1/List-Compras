import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      newListIndex: {
        indexArray: number;
      };
    }
  }
}
export { express };
