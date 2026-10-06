import express, { type Response } from "express";
import patientsService from "../services/patientsService.ts";
import type { PatientNoSsn } from "../types.ts";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res: Response<PatientNoSsn[]>) => {
  res.json(patientsService.getAllNoSsn());
});

patientsRouter.post("/", (_req, res) => {
  res.status(201).json({ message: patientsService.add() });
});

export default patientsRouter;
