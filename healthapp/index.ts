import express from "express";
import calculateBmi from "./bmiCalculator.ts";
import calculateExercises from "./exerciseCalculator.ts";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({
      error: "malformatted parameters",
    });
    return;
  }

  try {
    const bmi = calculateBmi(height, weight);
    res.json({ height, weight, bmi });
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";

    if (error instanceof Error) errorMessage += `: ${error.message}`;

    res.status(400).json({ error: errorMessage });
  }
});

app.post("/exercises", (req, res) => {
  if (
    !req.body ||
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    req.body.target === undefined ||
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    req.body.daily_exercises === undefined
  ) {
    res.status(400).json({
      error: "parameters missing",
    });
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises: dailyExercises } = req.body;

  if (
    isNaN(Number(target)) ||
    !Array.isArray(dailyExercises) ||
    dailyExercises.some((d) => isNaN(Number(d)))
  ) {
    res.status(400).json({
      error: "malformatted parameters",
    });
    return;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(dailyExercises, target);
    res.json(result);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) errorMessage += `: ${error.message}`;
    res.status(400).json({ error: errorMessage });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
