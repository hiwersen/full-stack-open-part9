import express, { type Request, type Response } from "express";
import diaryService from "../services/diaryService.ts";
import { type DiaryEntry, type NewDiaryEntry } from "../types.ts";
import { newDiaryEntryParser, errorMiddleware } from "../middleware.ts";

const router = express.Router();

router.get("/", (_req, res: Response<DiaryEntry[]>) => {
  const diaryEntry = diaryService.getDiaryEntries();
  res.send(diaryEntry);
});

router.get("/:id", (req, res) => {
  const diaryEntry = diaryService.findById(Number(req.params.id));

  if (diaryEntry) {
    res.send(diaryEntry);
  } else {
    res.sendStatus(404);
  }
});

router.post(
  "/",
  newDiaryEntryParser,
  (
    req: Request<unknown, unknown, NewDiaryEntry>,
    res: Response<DiaryEntry>,
  ) => {
    const diaryEntry = diaryService.addDiaryEntry(req.body);
    res.json(diaryEntry);
  },
);

router.use(errorMiddleware);

export default router;
