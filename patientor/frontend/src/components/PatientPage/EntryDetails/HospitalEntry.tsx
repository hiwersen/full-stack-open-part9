import type { HospitalEntry } from "../../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const HospitalEntry = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <p>
      <LocalHospitalIcon sx={{ verticalAlign: "bottom" }} /> discharge{" "}
      {entry.discharge.date} {entry.discharge.criteria}
    </p>
  );
};

export default HospitalEntry;
