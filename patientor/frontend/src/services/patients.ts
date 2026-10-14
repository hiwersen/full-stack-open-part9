import axios from "axios";
import type { Patient, PatientFormValues } from "../types";

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

export default {
  getAll,
  get,
  create,
};
