import { type NewPatient, Gender } from "./types.ts";

const isString = (param: unknown): param is string => {
  return typeof param === "string" || param instanceof String;
};

const isDate = (param: string): boolean => {
  return Boolean(Date.parse(param));
};

const isSsn = (param: string): boolean => {
  const ssn = new RegExp(/^\d{6}-\d+[A-Z]*$/);
  return ssn.test(param);
};

const isGender = (param: string): param is Gender => {
  return (Object.values(Gender) as string[]).includes(param);
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Invalid name: " + JSON.stringify(name));
  }
  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error("Invalid dateOfBirth: " + JSON.stringify(dateOfBirth));
  }
  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn) || !isSsn(ssn)) {
    throw new Error("Invalid ssn: " + JSON.stringify(ssn));
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Invalid gender: " + JSON.stringify(gender));
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Invalid occupation: " + JSON.stringify(occupation));
  }
  return occupation;
};

export const parseNewPatient = (param: unknown): NewPatient => {
  if (!param || typeof param !== "object") {
    throw new Error("Missing or incorrect newPatient object");
  }

  if (
    !("name" in param) ||
    !("dateOfBirth" in param) ||
    !("ssn" in param) ||
    !("gender" in param) ||
    !("occupation" in param)
  ) {
    throw new Error("Missing some newPatient's required field");
  }

  const newPatient = {
    name: parseName(param.name),
    dateOfBirth: parseDateOfBirth(param.dateOfBirth),
    ssn: parseSsn(param.ssn),
    gender: parseGender(param.gender),
    occupation: parseOccupation(param.occupation),
  };

  return newPatient;
};
