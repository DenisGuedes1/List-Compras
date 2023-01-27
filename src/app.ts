import express, { Application, json } from "express";
import { createClient, readClients } from "./logic";
import {
  midleWare,
  verifyStringOrNumber,
  verifyStringOrNumberValor,
} from "./midleare";

const app: Application = express();
app.use(json());

app.post(
  "/purchaseList",
  midleWare,
  verifyStringOrNumber,
  verifyStringOrNumberValor,
  createClient
);
app.get("/purchaseList", midleWare, readClients);
app.get("/clients:id", midleWare);
app.delete("/clients:id", midleWare);

const PORT: number = 3000;
const runningMsg: string = `Server running on http://localhost:${PORT}`;
app.listen(PORT, () => console.log(runningMsg));
