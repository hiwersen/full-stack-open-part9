import type { SubmitEventHandler } from "react";
import { useState } from "react";

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  FormControl,
} from "@mui/material";

import type { NewPatient } from "../../types";
import { Gender } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (newPatient: NewPatient) => Promise<void>;
}

interface GenderOption {
  value: Gender;
  label: string;
}

const genderOptions: GenderOption[] = Object.entries(Gender).map(
  ([label, value]) => ({
    label,
    value,
  }),
);

const AddPatientForm = ({ onCancel, onSubmit }: Props) => {
  const [name, setName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [ssn, setSsn] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState<Gender>(Gender.Other);

  const addPatient: SubmitEventHandler = (event) => {
    event.preventDefault();
    void onSubmit({
      name,
      occupation,
      ssn,
      dateOfBirth,
      gender,
    });
  };

  return (
    <form onSubmit={addPatient}>
      <TextField
        sx={{ marginTop: 1 }}
        fullWidth
        label="Name"
        required
        value={name}
        onChange={({ target }) => setName(target.value)}
      />
      <TextField
        sx={{ marginTop: 1 }}
        fullWidth
        label="Social security number"
        required
        value={ssn}
        onChange={({ target }) => setSsn(target.value)}
      />
      <TextField
        sx={{ marginTop: 1 }}
        fullWidth
        label="Date of birth"
        required
        type="date"
        value={dateOfBirth}
        onChange={({ target }) => setDateOfBirth(target.value)}
        slotProps={{
          htmlInput: {
            max: new Date().toLocaleDateString("sv-SE"),
            onClick: (e: React.MouseEvent<HTMLInputElement>) =>
              e.currentTarget.showPicker(),
          },
          inputLabel: { shrink: true },
        }}
      />
      <TextField
        sx={{ marginTop: 1 }}
        fullWidth
        label="Occupation"
        required
        value={occupation}
        onChange={({ target }) => setOccupation(target.value)}
      />

      <FormControl fullWidth required sx={{ marginTop: 1 }}>
        <InputLabel id="gender-label-id">Gender</InputLabel>
        <Select
          labelId="gender-label-id"
          label="Gender"
          value={gender}
          onChange={({ target }) => setGender(target.value)}
        >
          {genderOptions.map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Grid container justifyContent="space-between" sx={{ marginTop: 1 }}>
        <Grid size="auto">
          <Button
            color="secondary"
            variant="contained"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Grid>
        <Grid size="auto">
          <Button type="submit" variant="contained">
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddPatientForm;
