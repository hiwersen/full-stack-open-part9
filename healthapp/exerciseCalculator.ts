interface ExerciseValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface CalculateExercisesArguments {
  target: number;
  dailyExercises: number[];
}

const parseArguments = (args: string[]): CalculateExercisesArguments => {
  if (args.length < 4)
    throw new Error("Provide target hours and at least one day record");

  const target = Number(args[2]);
  const dailyExercises = args.slice(3).map((d) => Number(d));

  const dailyExercisesHasNaN = dailyExercises.some((d) => isNaN(d));

  if (isNaN(target) || dailyExercisesHasNaN)
    throw new Error("target and dailyExercises must be number");

  return {
    target,
    dailyExercises,
  };
};

const calculateExercises = (
  dailyExercises: number[],
  target: number,
): ExerciseValues => {
  if (dailyExercises.length === 0)
    throw new Error("dailyExercises must contain at least one day");

  if (target <= 0) throw new Error("target must be greater than zero");

  const periodLength = dailyExercises.length;
  const trainingDays = dailyExercises.filter((day) => day > 0).length;
  const average =
    dailyExercises.reduce((sum, day) => sum + day, 0) / periodLength;
  const success = average >= target;
  const ratingDescriptions = [
    "poor",
    "not too bad but could be better",
    "great",
  ];
  let rating = average >= target ? 2 : Math.round(average / target);
  const ratingDescription = ratingDescriptions[rating];
  ++rating;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, dailyExercises } = parseArguments(process.argv);

  console.log(calculateExercises(dailyExercises, target));
} catch (error: unknown) {
  let errorMessage = "Something went wrong";

  if (error instanceof Error) errorMessage += `: ${error.message}`;

  console.log(errorMessage);
}

export {};
