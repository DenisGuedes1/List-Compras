import { NextFunction, Request, Response } from "express";
import { clients, ids } from "./database";
import { Client, ClienteRequiredKeys, Listnew } from "./interface";

const validateData = (payload: any): Client => {
  const payloadKeys: string[] = Object.keys(payload);
  const requiredKeys: ClienteRequiredKeys[] = ["nome", "quantidade", "valor"];
  const hasRequiredKeys: boolean = requiredKeys.every((key: string) =>
    payloadKeys.includes(key)
  );
  if (!hasRequiredKeys) {
    const joinedKeys: string = requiredKeys.join(", ");
    throw new Error(`Required keys are: ${joinedKeys}.`);
  }
  return payload;
};

const createClient = (request: Request, response: Response): Response => {
  try {
    let currentId = 1;
    console.log(currentId);
    function incrementId(arr: Listnew[]): number {
      if (!arr.length) {
        return 1;
      }
      const currentId: Listnew = arr
        .sort((idInicial, idFinal) => idInicial.id - idFinal.id)
        .pop() as Listnew;
      return currentId.id + 1;
    }
    // const validatedData: clients = validateData(request.body);

    // let id: number = Math.floor(Math.random() * 1000);
    let idExists = ids.find((element) => element === currentId);
    if (idExists) {
      return response.status(409).json({
        message: "id existente",
      });
    }
    const newID: number = incrementId(clients);
    const newArray: Listnew = {
      id: newID,
      ...request.body,
    };
    clients.push(newArray);
    console.log(ids);

    return response.status(201).json(newArray);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).json({
        message: error.message,
      });
    }
    console.log(error);
  } finally {
    return response.status(404).json({ message: Error });
  }
};
const readClients = (request: Request, response: Response): Response => {
  return response.status(200).json(clients);
};

const midleWare = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  console.log(request);
  console.log(response);
  if (request.body.length === 3) {
    return response.status(400).json({
      message: " status indefinidios",
    });
  }
  return next();
};

// const retrieveWorkOrder = (request: Request, response: Response): Response => {
//   const id: number = request.newListIndex.indexArray;

//   return response.json(clients[id]);
// };
// console.log(retrieveWorkOrder);
// const deleteItem = (request: Request, response: Response): Response => {
//   const indexArray: number = request.newListIndex.indexArray;
//   console.log(indexArray);

//   clients.splice(indexArray, 1);

//   return response.status(204).send();

// const deleteItem = (request: Request, response: Response): Response => {
//   // const indexWorkOrder: number = request..indexWorkOrder

//   // clients.splice(indexWorkOrder, 1)

//   return response.status(204).send();
// };
export { createClient, readClients, midleWare };
