import express, {
  type Request,
  type Response,
  type RequestHandler,
  type ErrorRequestHandler,
} from "express";
import patientsService from "../services/patientsService.ts";
import {
  type Patient,
  type NewPatient,
  type PatientSummary,
  NewPatientSchema,
  NewEntrySchema,
  type NewEntry,
  type Entry,
} from "../types.ts";
import { z } from "zod";

type ErrorBody = { error: string };

const patientsRouter = express.Router();

const parseNewPatient: RequestHandler = (req, _res, next) => {
  try {
    req.body = NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const parseNewEntry: RequestHandler = (req, _res, next) => {
  try {
    req.body = NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware: ErrorRequestHandler = (
  error: unknown,
  _req,
  res,
  next,
) => {
  if (error instanceof z.ZodError) {
    res.status(400).json({ error: error.issues });
  } else {
    next(error);
  }
};

patientsRouter.get("/", (_req, res: Response<PatientSummary[]>) => {
  res.json(patientsService.getAll());
});

patientsRouter.get("/:id", (req, res: Response<Patient | ErrorBody>) => {
  const patient = patientsService.get(req.params.id);

  if (!patient) {
    res.status(404).json({ error: "patient not found" });
    return undefined;
  }

  res.json(patient);
});

patientsRouter.post(
  "/",
  parseNewPatient,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientsService.add(req.body);
    res.json(addedPatient);
  },
);

patientsRouter.post(
  "/:id/entries",
  parseNewEntry,
  (
    req: Request<{ id: string }, unknown, NewEntry>,
    res: Response<Entry | ErrorBody>,
  ) => {
    const addedEntry = patientsService.addEntry(req.params.id, req.body);

    if (!addedEntry) {
      res.status(404).json({ error: "patient not found" });
      return undefined;
    }

    res.json(addedEntry);
  },
);

patientsRouter.use(errorMiddleware);

export default patientsRouter;
