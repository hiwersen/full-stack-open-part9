import { type Request, type Response, type NextFunction } from "express";
import { NewDiaryEntrySchema } from "./types.ts";
import { z } from "zod";

export const newDiaryEntryParser = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    NewDiaryEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};
