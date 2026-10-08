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

const add = (newPatient: NewPatient): Patient => {
  const patient: Patient = {
    id: uuid(),
    ...newPatient,
  };

  patientsData.push(patient);
  return patient;
};

export default { getAllNoSsn, add };
