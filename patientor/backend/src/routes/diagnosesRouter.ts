import express from "express";
import diagnosesService from "../services/diagnosesService.ts";

const diagnosesRouter = express.Router();

diagnosesRouter.get("/", (_req, res) => {
  res.json({ data: diagnosesService.getAll() });
});

diagnosesRouter.post("/", (_req, res) => {
  res.json({ message: diagnosesService.add() });
});

export default diagnosesRouter;
