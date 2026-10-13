import { useState } from "react";
import type { NewDiaryEntry, NewDiaryEntryFormProps } from "../types";
import diaryService from "../diaryService";
import axios from "axios";

const NewDiaryEntryForm = ({
  diaryEntries,
  setDiaryEntries,
}: NewDiaryEntryFormProps) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
        setErrorMessage("");
      })
      .catch((error: unknown) => {
        if (axios.isAxiosError(error)) {
          const data: unknown = error.response?.data;

          if (data !== null && typeof data === "object" && "error" in data) {
            const error: unknown = data.error;

            if (Array.isArray(error)) {
              const firstError: unknown = error[0];

              if (firstError !== null && typeof firstError === "object") {
                let firstErrorMessage = "Error";

                if (
                  "message" in firstError &&
                  typeof firstError.message === "string"
                ) {
                  firstErrorMessage += `: ${firstError.message}`;
                }

                if (
                  "path" in firstError &&
                  Array.isArray(firstError.path) &&
                  firstError.path[0] !== null &&
                  typeof firstError.path[0] === "string"
                ) {
                  firstErrorMessage += ` at ${firstError.path[0]} field`;
                }

                setErrorMessage(firstErrorMessage);
              }
            }
          }
        } else {
          console.error(error);
        }
      });
  };

  return (
    <>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
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
    </>
  );
};

export default NewDiaryEntryForm;
