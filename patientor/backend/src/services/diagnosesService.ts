import diagnosesData from "../../data/diagnosesData.ts";
import type { Diagnosis } from "../types.ts";

const getAll = (): Diagnosis[] => diagnosesData;

const add = () => "diagnosis added";

export default { getAll, add };
