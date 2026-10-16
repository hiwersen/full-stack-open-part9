import type { HealthCheckEntry } from "../../../types";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";

const HealthCheckEntry = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <p>
      <MonitorHeartIcon sx={{ verticalAlign: "bottom" }} /> health rate{" "}
      {entry.healthCheckRating}
    </p>
  );
};

export default HealthCheckEntry;
