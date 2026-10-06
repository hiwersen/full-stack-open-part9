import express, { type Response } from "express";
import diagnosesService from "../services/diagnosesService.ts";
import type { Diagnosis } from "../types.ts";

const diagnosesRouter = express.Router();

diagnosesRouter.get("/", (_req, res: Response<Diagnosis[]>) => {
  res.json(diagnosesService.getAll());
});

diagnosesRouter.post("/", (_req, res) => {
  res.status(201).json({ message: diagnosesService.add() });
});

export default diagnosesRouter;
