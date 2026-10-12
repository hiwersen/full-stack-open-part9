import { useState } from "react";
import type { NewDiaryEntry, NewDiaryEntryFormProps } from "../types";
import diaryService from "../diaryService";

const NewDiaryEntryForm = ({
  diaryEntries,
  setDiaryEntries,
}: NewDiaryEntryFormProps) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const newDiaryEntry: NewDiaryEntry = {
      date,
      weather,
      visibility,
      comment,
    };

    diaryService
      .create(newDiaryEntry)
      .then((diaryEntry) => {
        setDiaryEntries(diaryEntries.concat(diaryEntry));
        setDate("");
        setVisibility("");
        setWeather("");
        setComment("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="date">date</label>
        <input
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="weather">weather</label>
        <input
          name="weather"
          value={weather}
          onChange={(e) => setWeather(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="visibility">visibility</label>
        <input
          name="visibility"
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="comment">comment</label>
        <input
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <button type="submit">add</button>
    </form>
  );
};

export default NewDiaryEntryForm;
