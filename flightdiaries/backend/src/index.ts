import express from "express";
import diaryRouter from "./routes/diaryRouter.ts";
import cors from "cors";

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diaries", diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
