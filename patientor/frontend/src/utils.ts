import axios from "axios";

export const getAxiosErrorMessage = (error: unknown): string => {
  if (!axios.isAxiosError(error)) return "Unknown error";
  let errorMessage: string = "";

  const data: unknown = error.response?.data;

  if (
    data !== null &&
    typeof data === "object" &&
    "error" in data &&
    Array.isArray(data.error)
  ) {
    const firstError: unknown = data.error[0];

    if (firstError !== null && typeof firstError === "object") {
      if ("message" in firstError && typeof firstError.message === "string") {
        errorMessage += firstError.message;
      }

      if (
        "path" in firstError &&
        Array.isArray(firstError.path) &&
        typeof firstError.path[0] === "string"
      ) {
        errorMessage = `${errorMessage || "Error"} at "${firstError.path[0]}" field`;
      }
    }
  }

  return errorMessage || error.message;
};
