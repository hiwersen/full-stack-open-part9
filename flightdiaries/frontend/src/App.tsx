import Header from "./components/Header";
import DiaryEntries from "./components/DiaryEntries";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { type DiaryEntry } from "./types";
import diaryService from "./diaryService";

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService
      .getAll()
      .then((diaryEntries) => {
        setDiaryEntries(diaryEntries);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Header />
      <DiaryEntries diaryEntries={diaryEntries} />
      <Footer />
    </>
  );
};

export default App;
