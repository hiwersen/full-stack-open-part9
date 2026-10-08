import express, { type Response } from "express";
import patientsService from "../services/patientsService.ts";
import type { PatientNoSsn } from "../types.ts";
import { parseNewPatient } from "../utils.ts";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res: Response<PatientNoSsn[]>) => {
  res.json(patientsService.getAllNoSsn());
});

patientsRouter.post("/", (req, res) => {
  try {
    const newPatient = parseNewPatient(req.body);
    const addedPatient = patientsService.add(newPatient);
    res.status(201).json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";

    if (error instanceof Error) {
      errorMessage += `: ${error.message}`;
    }

    res.status(400).json({ message: errorMessage });
  }
});

export default patientsRouter;
