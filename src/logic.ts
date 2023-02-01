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

    let idExists = ids.find((element) => element === currentId);

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
  return response.status(200).json(clients);
};
const deleteListCompleted = (
  request: Request,
  response: Response
): Response => {
  const indexArray: number = request.listIndex.indexArrayClient;

  clients.splice(indexArray, 1);

  return response.status(204).send();
};
const getOneListId = (request: Request, response: Response): Response => {
  const indexPurchaseList: number = request.listIndex.indexArrayClient;

  return response.json(clients[indexPurchaseList]);
};
const updateList = (request: Request, response: Response): Response => {
  const id: number = request.listIndex.indexArrayClient;
  const itemID = request.listIndex.indexArrayClient;
  console.log("itemID", itemID);
  const itemIndex = clients[id].data.findIndex(
    (element) => element.name === request.params.index
  );
  if (typeof request.body.quantity !== "string") {
    return response.status(400).json({
      message: "Verifique se nao esta passando numero ao inves de string",
    });
  }
  const newItem = {
    ...clients[id].data[itemIndex],
    ...request.body,
  };

  clients[id].data[itemIndex] = newItem;

  return response.status(200).json(clients[id].data[itemIndex]);
};
const deleteOneItemList = (request: Request, response: Response) => {
  const { name, id } = request.params;
  const stringId = +id;
  const oneItemDel = clients.find((elem) => elem.id === stringId);
  if (!oneItemDel) {
    return response.status(404).send();
  }
  const DB = oneItemDel.data;
  const indexKeyList = DB.findIndex((elem) => elem.name === name);
  DB.splice(indexKeyList, 1);
  return response.status(204).send;
};

export {
  createClient,
  readClients,
  deleteListCompleted,
  getOneListId,
  updateList,
  deleteOneItemList,
};
