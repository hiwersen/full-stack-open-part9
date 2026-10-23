import { TextField } from "@mui/material";
import React from "react";
interface Props {
  dischargeDate: string;
  dischargeCriteria: string;
  setDischargeDate: React.Dispatch<React.SetStateAction<string>>;
  setDischargeCriteria: React.Dispatch<React.SetStateAction<string>>;
}

const HospitalForm = ({
  dischargeDate,

  dischargeCriteria,
  setDischargeDate,
  setDischargeCriteria,
}: Props) => {
  return (
    <>
      <TextField
        sx={{ marginTop: 1 }}
        label="Discharge Date"
        type="date"
        required
        value={dischargeDate}
        onChange={({ target }) => setDischargeDate(target.value)}
        slotProps={{
          htmlInput: {
            onClick: (e: React.MouseEvent<HTMLInputElement>) =>
              e.currentTarget.showPicker(),
          },
          inputLabel: { shrink: true },
        }}
        fullWidth
      />
      <TextField
        sx={{ marginTop: 1 }}
        label="Discharge Criteria"
        required
        value={dischargeCriteria}
        onChange={({ target }) => setDischargeCriteria(target.value)}
        fullWidth
      />
    </>
  );
};

export default HospitalForm;
