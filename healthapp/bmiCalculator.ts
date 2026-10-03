type BmiResult = "Underweight" | "Normal range" | "Overweight" | "Obese";

interface CalculateBmiArguments {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): CalculateBmiArguments => {
  if (args.length < 4) throw new Error("Provide height in cm and weight in kg");
  if (args.length > 4) throw new Error("Too many arguments");

  const height = Number(process.argv[2]);
  const weight = Number(process.argv[3]);

  if (isNaN(height) || isNaN(weight))
    throw new Error("height and weight must be numbers");

  return { height, weight };
};

const calculateBmi = (height: number, weight: number): BmiResult => {
  if (height <= 0 || weight <= 0)
    throw new Error("height and weight must be greater than zero");

  const BMI = weight / (height / 100) ** 2;

  if (BMI < 18.5) return "Underweight";
  if (BMI < 25) return "Normal range";
  if (BMI < 30) return "Overweight";
  return "Obese";
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";

    if (error instanceof Error) errorMessage += `: ${error.message}`;

    console.log(errorMessage);
  }
}

export default calculateBmi;
