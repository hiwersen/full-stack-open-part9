export const Weather = {
  Sunny: "sunny",
  Rainy: "rainy",
  Cloudy: "cloudy",
  Stormy: "stormy",
  Windy: "windy",
} as const;

export type Weather = (typeof Weather)[keyof typeof Weather];

export const Visibility = {
  Great: "great",
  Good: "good",
  Ok: "ok",
  Poor: "poor",
} as const;

export type Visibility = (typeof Visibility)[keyof typeof Visibility];

export interface DiaryEntry {
  id: number;
  weather: string;
  visibility: string;
  date: string;
  comment?: string | undefined;
}

export type NewDiaryEntry = Omit<DiaryEntry, "id">;

export interface DiaryEntriesProps {
  diaryEntries: DiaryEntry[];
}

export interface NewDiaryEntryFormProps {
  diaryEntries: DiaryEntry[];
  setDiaryEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
}
