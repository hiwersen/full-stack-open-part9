import axios from "axios";
import type {
  Entry,
  NewEntry,
  Patient,
  NewPatient,
  PatientSummary,
} from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async (): Promise<PatientSummary[]> => {
  const { data: patients } = await axios.get<PatientSummary[]>(
    `${apiBaseUrl}/patients`,
  );

  return patients;
};

const get = async (id: string): Promise<Patient> => {
  const { data: patient } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`,
  );

  return patient;
};

const create = async (newPatient: NewPatient): Promise<Patient> => {
  const { data: patient } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    newPatient,
  );

  return patient;
};

const createEntry = async (
  patientId: string,
  newEntry: NewEntry,
): Promise<Entry> => {
  const { data: entry } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${patientId}/entries`,
    newEntry,
  );

  return entry;
};

export default {
  getAll,
  get,
  create,
  createEntry,
};
