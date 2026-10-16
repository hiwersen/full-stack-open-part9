import type { OccupationalHealthcareEntry } from "../../../types";
import WorkIcon from "@mui/icons-material/Work";

const OccupationalHealthcareEntry = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <div>
      <p>
        <WorkIcon sx={{ verticalAlign: "bottom" }} /> employer{" "}
        {entry.employerName}
      </p>
      {entry.sickLeave && (
        <p>
          sick leave start {entry.sickLeave.startDate} end{" "}
          {entry.sickLeave.endDate}
        </p>
      )}
    </div>
  );
};

export default OccupationalHealthcareEntry;
