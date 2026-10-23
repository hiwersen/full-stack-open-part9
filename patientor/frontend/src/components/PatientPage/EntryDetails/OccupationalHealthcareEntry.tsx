import { Box, Chip, Stack, Typography } from "@mui/material";
import type { OccupationalHealthcareEntry } from "../../../types";
import WorkIcon from "@mui/icons-material/Work";

const OccupationalHealthcareEntry = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <Box>
      <Typography>
        <WorkIcon sx={{ verticalAlign: "bottom" }} /> employer{" "}
        {entry.employerName}
      </Typography>
      {entry.sickLeave && (
        <>
          <Typography>sick leave</Typography>
          <Stack direction="row" spacing={2}>
            <Chip
              variant="outlined"
              label={`start ${entry.sickLeave.startDate}`}
            />
            <Chip variant="outlined" label={`end ${entry.sickLeave.endDate}`} />
          </Stack>
        </>
      )}
    </Box>
  );
};

export default OccupationalHealthcareEntry;
