import patientsData from "../../data/patientsData.ts";
import type {
  Patient,
  PatientNoSsn,
  NewPatient,
  NewEntry,
  Entry,
} from "../types.ts";
import { v1 as uuid } from "uuid";

const getAllNoSsn = (): PatientNoSsn[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const get = (id: string): Patient | undefined => {
  return patientsData.find((p) => p.id === id);
};

const add = (newPatient: NewPatient): Patient => {
  const patient: Patient = {
    ...newPatient,
    id: uuid(),
    entries: [],
  };

  patientsData.push(patient);
  return patient;
};

const addEntry = (id: string, newEntry: NewEntry): Entry | undefined => {
  const patient = get(id);
  if (!patient) return;

  const entry: Entry = { ...newEntry, id: uuid() };
  patient.entries.push(entry);
  return entry;
};

export default { getAllNoSsn, get, add, addEntry };
