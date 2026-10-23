import { TextField } from "@mui/material";
import React from "react";

interface Props {
  employerName: string;
  sickLeaveStartDate: string;
  sickLeaveEndDate: string;
  setEmployerName: React.Dispatch<React.SetStateAction<string>>;
  setSickLeaveStartDate: React.Dispatch<React.SetStateAction<string>>;
  setSickLeaveEndDate: React.Dispatch<React.SetStateAction<string>>;
}

const OccupationalHealthcareForm = ({
  employerName,
  sickLeaveStartDate,
  sickLeaveEndDate,
  setEmployerName,
  setSickLeaveStartDate,
  setSickLeaveEndDate,
}: Props) => {
  return (
    <>
      <TextField
        sx={{ marginTop: 1 }}
        label="Employer Name"
        required
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
        fullWidth
      />
      <TextField
        sx={{ marginTop: 1 }}
        required={Boolean(sickLeaveEndDate)}
        label="Sick Leave Start Date"
        type="date"
        value={sickLeaveStartDate}
        onChange={({ target }) => setSickLeaveStartDate(target.value)}
        slotProps={{
          htmlInput: {
            max: new Date().toLocaleDateString("sv-SE"),
            onClick: (e: React.MouseEvent<HTMLInputElement>) =>
              e.currentTarget.showPicker(),
          },
          inputLabel: { shrink: true },
        }}
        fullWidth
      />
      <TextField
        sx={{ marginTop: 1 }}
        required={Boolean(sickLeaveStartDate)}
        label="Sick Leave End Date"
        type="date"
        value={sickLeaveEndDate}
        onChange={({ target }) => setSickLeaveEndDate(target.value)}
        fullWidth
        slotProps={{
          htmlInput: {
            min: sickLeaveStartDate,
            onClick: (e: React.MouseEvent<HTMLInputElement>) =>
              e.currentTarget.showPicker(),
          },
          inputLabel: { shrink: true },
        }}
      />
    </>
  );
};

export default OccupationalHealthcareForm;
