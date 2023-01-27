import express, { Application, json } from "express";
import { createClient, midleWare, readClients } from "./logic";

const app: Application = express();
app.use(json());

app.post("/clients", midleWare, createClient);
app.get("/clients", midleWare, readClients);
app.get("/clients:id", midleWare, readClients);
app.delete("/list:id", midleWare);

const PORT: number = 3000;
const runningMsg: string = `Server running on http://localhost:${PORT}`;
app.listen(PORT, () => console.log(runningMsg));
