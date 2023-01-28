import { NextFunction, Request, Response } from "express";

const midleWare = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  if (request.body.length === 3) {
    return response.status(400).json({
      message: "status indefinidios",
    });
  }
  return next();
};
const verifyStringOrNumber = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  if (typeof request.body.listName !== "string") {
    return response.status(400).json({
      message: "verifique se não esta passando numeros ao inves de textos",
    });
  }
  return next();
};
const verifyStringOrNumberValor = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  if (
    typeof request.body.data.price === "number" &&
    !isNaN(request.body.data.price)
  ) {
    return console.log(request.body.price);
  } else {
    response.status(400).send({ error: "Price deve ser um número" });
  }
};

export { midleWare, verifyStringOrNumber, verifyStringOrNumberValor };
