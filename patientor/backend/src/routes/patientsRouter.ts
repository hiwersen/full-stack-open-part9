import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import patientsService from "../services/patientsService.ts";
import {
  type NewPatient,
  type PatientNoSsn,
  NewPatientSchema,
} from "../types.ts";
import { z } from "zod";

const patientsRouter = express.Router();

const NewPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof z.ZodError) {
    res.status(400).json({ error: error.issues });
  } else {
    next(error);
  }
};

patientsRouter.get("/", (_req, res: Response<PatientNoSsn[]>) => {
  res.json(patientsService.getAllNoSsn());
});

patientsRouter.post(
  "/",
  NewPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<PatientNoSsn>) => {
    const addedPatient = patientsService.add(req.body);
    res.status(201).json(addedPatient);
  },
);

patientsRouter.use(errorMiddleware);

export default patientsRouter;
