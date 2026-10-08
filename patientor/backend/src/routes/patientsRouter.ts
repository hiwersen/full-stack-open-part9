import express, { type Response } from "express";
import patientsService from "../services/patientsService.ts";
import type { PatientNoSsn } from "../types.ts";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res: Response<PatientNoSsn[]>) => {
  res.json(patientsService.getAllNoSsn());
});

patientsRouter.post("/", (req, res: Response<PatientNoSsn>) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const addedPatient = patientsService.add(req.body);
  res.status(201).json(addedPatient);
});

export default patientsRouter;
