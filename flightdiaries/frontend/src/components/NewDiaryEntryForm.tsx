import { useState, type CSSProperties } from "react";
import {
  type NewDiaryEntry,
  type NewDiaryEntryFormProps,
  Weather,
  Visibility,
} from "../types";
import diaryService from "../diaryService";
import axios from "axios";

const NewDiaryEntryForm = ({ setDiaryEntries }: NewDiaryEntryFormProps) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
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
        setDiaryEntries((prev) => prev.concat(diaryEntry));
        setDate("");
        setWeather(Weather.Sunny);
        setVisibility(Visibility.Great);
        setComment("");
        setErrorMessage("");
      })
      .catch((error: unknown) => {
        if (axios.isAxiosError(error)) {
          const data: unknown = error.response?.data;

          if (data !== null && typeof data === "object" && "error" in data) {
            const errors: unknown = data.error;

            if (Array.isArray(errors)) {
              const firstError: unknown = errors[0];

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

  const style: CSSProperties = {
    width: "100%",
    boxSizing: "border-box",
  };

  return (
    <>
      <h2>Add New Diary Entry</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <table>
          <thead></thead>
          <tbody>
            <tr>
              <td>
                <label htmlFor="date">date</label>
              </td>
              <td>
                <input
                  style={style}
                  id="date"
                  type="date"
                  name="date"
                  value={date}
                  max={new Date().toLocaleDateString("sv-SE")}
                  onChange={(e) => setDate(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>weather</td>
              <td>
                {Object.values(Weather).map((value) => (
                  <label key={value} style={{ marginRight: "1em" }}>
                    <input
                      type="radio"
                      name="weather"
                      value={value}
                      checked={value === weather}
                      onChange={() => setWeather(value)}
                    />
                    {value}
                  </label>
                ))}
              </td>
            </tr>
            <tr>
              <td>visibility</td>
              <td>
                {Object.values(Visibility).map((value) => (
                  <label key={value} style={{ marginRight: "1em" }}>
                    <input
                      type="radio"
                      name="visibility"
                      value={value}
                      checked={value === visibility}
                      onChange={() => setVisibility(value)}
                    />
                    {value}
                  </label>
                ))}
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="comment">comment</label>
              </td>
              <td>
                <input
                  style={style}
                  id="comment"
                  name="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td>
                <button
                  style={{
                    ...style,
                    cursor: "pointer",
                  }}
                  type="submit"
                >
                  add
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </form>
    </>
  );
};

export default NewDiaryEntryForm;
