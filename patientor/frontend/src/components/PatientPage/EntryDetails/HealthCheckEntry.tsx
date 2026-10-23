import { Box, Rating, Typography } from "@mui/material";
import type { HealthCheckEntry } from "../../../types";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";

const HealthCheckEntry = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <Box>
      <Typography component="legend">
        <MonitorHeartIcon sx={{ verticalAlign: "bottom" }} />
        health rate
      </Typography>
      <Rating value={entry.healthCheckRating} readOnly />
    </Box>
  );
};

export default HealthCheckEntry;
