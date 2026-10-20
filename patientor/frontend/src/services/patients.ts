import axios from "axios";
import type { Entry, NewEntry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data: patients } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`,
  );

  return patients;
};

const get = async (id: string) => {
  const { data: patient } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`,
  );

  return patient;
};

const create = async (patientFormValues: PatientFormValues) => {
  const { data: patient } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    patientFormValues,
  );

  return patient;
};

const createEntry = async (patientId: string, newEntry: NewEntry) => {
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
