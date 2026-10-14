import patientsData from "../../data/patientsData.ts";
import type { Patient, PatientNoSsn, NewPatient } from "../types.ts";
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
    id: uuid(),
    ...newPatient,
    entries: [],
  };

  patientsData.push(patient);
  return patient;
};

export default { getAllNoSsn, get, add };
