import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { HealthCheckRating } from "../../../types";
import React from "react";

interface Props {
  healthCheckRating: HealthCheckRating;
  setHealthCheckRating: React.Dispatch<React.SetStateAction<HealthCheckRating>>;
}

const HealthCheckForm = ({
  healthCheckRating,
  setHealthCheckRating,
}: Props) => {
  return (
    <FormControl fullWidth sx={{ marginTop: 1 }} required>
      <InputLabel id="rating-label">Health Check Rating</InputLabel>
      <Select
        labelId="rating-label"
        label="Health Check Rating"
        value={healthCheckRating}
        onChange={({ target }) => setHealthCheckRating(target.value)}
        fullWidth
      >
        {Object.entries(HealthCheckRating).map(([key, value]) => (
          <MenuItem key={key} value={value}>
            {value} — {key}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default HealthCheckForm;
