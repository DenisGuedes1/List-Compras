import { Request, Response, response } from "express";
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
const validadeDate = (payload: any): Client => {
  const keysPayload: Array<string> = Object.keys(payload);
  const requiredKeys: Array<listRequeridData> = ["listName", "data"];

  const hasRequiredKeeys: boolean = requiredKeys.every((key: string) => {
    return keysPayload.includes(key);
  });

  if (!hasRequiredKeeys) {
    const JoinedKeys: string = requiredKeys.join(", ");
    throw new Error(`Required keys are: ${JoinedKeys}.`);
  }

  keysPayload.forEach((key: any) => {
    if (!requiredKeys.includes(key)) {
      return response.status(400).json({
        message: "Listname and data they are only necessary ",
      });
    }
  });
  return payload;
};

const createClient = (request: Request, response: Response): Response => {
  try {
    let currentId = 1;
    console.log(currentId);

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
    console.log("eu sou o console do new ARRAY", newArray);
    console.log("eu sou o console do clients", clients);
    clients.push(newArray);
    clients.push(newArray);

    console.log("hooi", validate);
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
  console.log("eu  sou o console da request", request);
  return response.status(200).json(clients);
};

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

export { createClient, readClients };
