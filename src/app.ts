import express, { Application, json } from "express";
import {
  createClient,
  deleteListCompleted,
  getOneListId,
  readClients,
} from "./logic";
import {
  midleWare,
  verifyExistencieList,
  verifyStringOrNumber,
} from "./midleare";

const app: Application = express();
app.use(json());

app.post("/purchaseList", midleWare, verifyStringOrNumber, createClient);
app.get("/purchaseList", midleWare, readClients);
app.get("/purchaseList/:id", verifyExistencieList, getOneListId);
app.delete("/purchaseList/:id", verifyExistencieList, deleteListCompleted);

const PORT: number = 3000;
const runningMsg: string = `Server running on http://localhost:${PORT}`;
app.listen(PORT, () => console.log(runningMsg));
