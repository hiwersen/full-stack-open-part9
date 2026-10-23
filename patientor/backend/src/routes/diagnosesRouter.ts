import express, { type Response } from "express";
import diagnosesService from "../services/diagnosesService.ts";
import type { Diagnosis } from "../types.ts";

interface MessageBody {
  message: string;
}

const diagnosesRouter = express.Router();

diagnosesRouter.get("/", (_req, res: Response<Diagnosis[]>) => {
  res.json(diagnosesService.getAll());
});

diagnosesRouter.post("/", (_req, res: Response<MessageBody>) => {
  res.json({ message: diagnosesService.add() });
});

export default diagnosesRouter;
