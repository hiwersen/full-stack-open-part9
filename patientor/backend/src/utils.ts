import { type NewPatient, NewPatientSchema } from "./types.ts";

export const parseNewPatient = (param: unknown): NewPatient => {
  return NewPatientSchema.parse(param);
};
