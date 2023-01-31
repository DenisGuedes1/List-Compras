import express, { Application, json } from "express";
import {
  createClient,
  deleteListCompleted,
  deleteOneListSale,
  getOneListId,
  readClients,
  updateList,
} from "./logic";
import {
  midleWare,
  seachIndexList,
  verifyExistencieList,
  verifyStringOrNumber,
} from "./midleare";

const app: Application = express();
app.use(json());

app.post("/purchaseList", midleWare, verifyStringOrNumber, createClient);
app.get("/purchaseList", midleWare, readClients);
app.get("/purchaseList/:id", verifyExistencieList, getOneListId);
app.delete("/purchaseList/:id", verifyExistencieList, deleteListCompleted);
app.delete("/purchaseList/:id/:index", seachIndexList, deleteOneListSale);
app.patch("/purchaseList/:id/:index", verifyExistencieList, updateList);

const PORT: number = 3000;
const runningMsg: string = `Server running on http://localhost:${PORT}`;
app.listen(PORT, () => console.log(runningMsg));
