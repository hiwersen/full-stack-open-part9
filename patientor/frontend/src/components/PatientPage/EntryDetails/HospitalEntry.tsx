import { Box, Chip, Stack, Typography } from "@mui/material";
import type { HospitalEntry } from "../../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const HospitalEntry = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <Box>
      <Typography>
        <LocalHospitalIcon sx={{ verticalAlign: "bottom" }} />
        discharge
      </Typography>
      <Stack direction="row" spacing={2}>
        <Chip variant="outlined" label={entry.discharge.date} />
        <Chip variant="outlined" label={entry.discharge.criteria} />
      </Stack>
    </Box>
  );
};

export default HospitalEntry;
