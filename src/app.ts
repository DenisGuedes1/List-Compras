import express, { Application, json } from "express";
import { createClient, readClients } from "./logic";

const app: Application = express();
app.use(json());

app.post("/clients", createClient);
app.get("/clients", readClients);

const PORT: number = 3000;
const runningMsg: string = `Server running on http://localhost:${PORT}`;
app.listen(PORT, () => console.log(runningMsg));
