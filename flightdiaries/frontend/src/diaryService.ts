import axios from "axios";
import type { DiaryEntry, NewDiaryEntry } from "./types";

const baseUrl = "http://localhost:3000/api/diaries";

const getAll = () => {
  return axios.get<DiaryEntry[]>(baseUrl).then(({ data }) => data);
};

const create = (newDiaryEntry: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(baseUrl, newDiaryEntry)
    .then(({ data }) => data);
};

export default { getAll, create };
