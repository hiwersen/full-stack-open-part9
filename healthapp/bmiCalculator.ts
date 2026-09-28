const calculateBmi = (height: number, weight: number): string => {
  const BMI: number = weight / (height / 100) ** 2;

  if (BMI < 18.5) return "Underweight";
  if (BMI < 25) return "Normal range";
  if (BMI < 30) return "Overweight";
  return "Obese";
};

console.log(calculateBmi(180, 74));
