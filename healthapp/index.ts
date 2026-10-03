import express from "express";
import calculateBmi from "./bmiCalculator.ts";

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
      error: "height and weight must be numbers",
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

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
