import express from "express";
import cors from "cors";
import diagnosesRouter from "./routes/diagnosesRouter.ts";
import patientsRouter from "./routes/patientsRouter.ts";

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
