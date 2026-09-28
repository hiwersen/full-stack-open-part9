interface ExerciseValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  dailyExercises: number[],
  target: number,
): ExerciseValues => {
  const periodLength = dailyExercises.length;
  const trainingDays = dailyExercises.filter((day) => day > 0).length;
  const average =
    dailyExercises.reduce((sum, day) => sum + day, 0) / periodLength;
  const success = average >= target;
  const ratingDescriptions = ["grate", "not too bad", "bad"];
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
