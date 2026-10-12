import diaryEntries from "../../data/diaryEntries.ts";
import type {
  DiaryEntry,
  NonSensitiveDiaryEntry,
  NewDiaryEntry,
} from "../types.ts";

const getDiaryEntries = (): DiaryEntry[] => {
  return diaryEntries;
};

const getNonSensitiveDiaryEntries = (): NonSensitiveDiaryEntry[] => {
  return diaryEntries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const findById = (id: number): DiaryEntry | undefined => {
  const diaryEntry = diaryEntries.find((d) => d.id === id);
  return diaryEntry;
};

const addDiaryEntry = (newDiaryEntry: NewDiaryEntry): DiaryEntry => {
  const diaryEntry = {
    id: Math.max(...diaryEntries.map((d) => d.id)) + 1,
    ...newDiaryEntry,
  };

  diaryEntries.push(diaryEntry);
  return diaryEntry;
};

export default {
  getDiaryEntries,
  getNonSensitiveDiaryEntries,
  addDiaryEntry,
  findById,
};
