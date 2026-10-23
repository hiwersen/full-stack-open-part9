import axios from "axios";
import type { Diagnosis } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async (): Promise<Diagnosis[]> => {
  const { data: diagnoses } = await axios.get<Diagnosis[]>(
    `${apiBaseUrl}/diagnoses`,
  );
  return diagnoses;
};

export default { getAll };
