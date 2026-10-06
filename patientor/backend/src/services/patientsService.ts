import patientsData from "../../data/patientsData.ts";
import type { PatientNoSsn } from "../types.ts";

const getAllNoSsn = (): PatientNoSsn[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const add = () => "patient added";

export default { getAllNoSsn, add };
