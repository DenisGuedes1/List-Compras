import { Request, Response } from "express";
import clients from "./database";
import { Client } from "./interface";

const createClient = (request: Request, response: Response): Response => {
  const newClient: Client = request.body;
  clients.push(newClient);
  return response.status(201).json(newClient);
};
const readClients = (request: Request, response: Response): Response => {
  return response.status(200).json(clients);
};

export { createClient, readClients };
