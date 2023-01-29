import { Request, Response } from "express";
import { clients, ids } from "./database";
import { Client, iClientID, listRequeridData } from "./interface";

const validateData = (payload: any): Client => {
  const payloadKeys: string[] = Object.keys(payload);
  const requiredKeys: listRequeridData[] = ["listName", "data"];
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

    function incrementId(arr: iClientID[]): number {
      if (!arr.length) {
        return 1;
      }
      const currentId: iClientID = arr
        .sort((idInicial, idFinal) => idInicial.id - idFinal.id)
        .pop() as iClientID;

      return currentId.id + 1;
    }
    const validate: Client = validateData(request.body);
    console.log("console validade", validate);

    let idExists = ids.find((element) => element === currentId);
    console.log("eu sou o console do id", idExists);
    if (idExists) {
      return response.status(409).json({
        message: "id existente",
      });
    }
    const newID: number = incrementId(clients);

    const newArray: iClientID = {
      id: newID,
      ...validate,
    };
    clients.push(newArray);
    clients.push(newArray);
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
  console.log("console log clients do get ", clients);
  return response.status(200).json(clients);
};
const deleteListCompleted = (
  request: Request,
  response: Response
): Response => {
  const indexArray: number = request.listIndex.indexArrayClient;

  console.log(
    "oi eu sou o console da request DeleteItem",
    request.listIndex.indexArrayClient
  );

  clients.splice(indexArray, 1);

  return response.status(204).send();
};
// const deleteItemList = (request: Request, response: Response): Response => {
//   const indexList: number = request.listIndex.indexArrayClient;

//   return response.json(clients[indexList]);

export { createClient, readClients, deleteListCompleted };
