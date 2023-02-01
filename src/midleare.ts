import { NextFunction, Request, Response } from "express";

import { clients } from "./database";

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
const verifyExistencieList = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const id: number = parseInt(request.params.id);

  const indexArrayClient = clients.findIndex(
    (elementList) => elementList.id === id
  );
  console.log("indexArrayClient", indexArrayClient);
  if (indexArrayClient === -1) {
    return response.status(404).json({
      message: "Lista nao existe",
    });
  }

  request.listIndex = {
    indexArrayClient: indexArrayClient,
  };

  const { listName, data } = request.body;

  request.validateClientList = { id, listName, data };

  return next();
};
const seachIndexList = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const id: number = parseInt(request.params.id);

  const indexList: number = clients.findIndex((el) => el.id === id);

  console.log(indexList);

  if (indexList === -1) {
    return response.status(404).json({
      message: "lista não encontrada",
    });
  }

  request.listIndex = {
    indexArrayClient: indexList,
  };

  return next();
};
const veifybodyOrString = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  if (typeof request.body.data !== "string") {
    return response.status(400).json({
      message: "verifique se não esta passando numeros ao inves de textos",
    });
  }
  return next();
};
const verifyParam = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  if (typeof request.params.name !== "string") {
    return response.status(400).json({
      message: "verifique os campos",
    });
  }

  return next();
};
const checkNameItem = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  request.body == undefined &&
    response.status(400).json({ message: "body can not send empty" });
  const { data } = clients[request.listIndex.indexArrayClient];
  const index = data.findIndex((el) => el.name === request.params.name);
  index >= 0
    ? (request.listIndex.indexArrayClient = index)
    : response
        .status(404)
        .json({ message: `${request.params.name} not found` });
  next();
};
export {
  midleWare,
  checkNameItem,
  verifyStringOrNumber,
  verifyStringOrNumberValor,
  verifyExistencieList,
  seachIndexList,
  veifybodyOrString,
  verifyParam,
};
