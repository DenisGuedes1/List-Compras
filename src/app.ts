import express, { Application, json } from "express";
import { createClient, deleteItem, readClients } from "./logic";
import {
  midleWare,
  verifyExistencieList,
  verifyStringOrNumber,
} from "./midleare";

const app: Application = express();
app.use(json());

app.post("/purchaseList", midleWare, verifyStringOrNumber, createClient);
app.get("/purchaseListall", readClients);
app.delete("/purchaseList/:id", verifyExistencieList, deleteItem);

const PORT: number = 3000;
const runningMsg: string = `Server running on http://localhost:${PORT}`;
app.listen(PORT, () => console.log(runningMsg));
