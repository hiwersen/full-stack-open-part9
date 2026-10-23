import {
  Button,
  TextField,
  Grid,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import patientService from "../../../services/patients";
import type { NewEntry, Entry, BaseEntry, Diagnosis } from "../../../types";
import { HealthCheckRating } from "../../../types";
import React, { useState } from "react";
import { getAxiosErrorMessage } from "../../../utils";
import HospitalForm from "./HospitalForm";
import HealthCheckForm from "./HealthCheckForm";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";
interface Props {
  patientId: string;
  handleCreatedEntry: (entry: Entry) => void;
  diagnoses: Diagnosis[];
}

const NewEntryForm = ({ patientId, handleCreatedEntry, diagnoses }: Props) => {
  const [type, setType] = useState<Entry["type"]>("HealthCheck");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [description, setDescription] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy,
  );
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const reset = () => {
    setType("HealthCheck");
    setDate("");
    setSpecialist("");
    setDescription("");
    setDiagnosisCodes([]);
    setHealthCheckRating(HealthCheckRating.Healthy);
    setDischargeDate("");
    setDischargeCriteria("");
    setEmployerName("");
    setSickLeaveStartDate("");
    setSickLeaveEndDate("");
    setErrorMessage("");
  };

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const newEntry = (): NewEntry => {
      const baseEntry: BaseEntry = {
        date,
        specialist,
        description,
        diagnosisCodes,
      };

      switch (type) {
        case "HealthCheck":
          return {
            ...baseEntry,
            type: "HealthCheck",
            healthCheckRating,
          };
        case "Hospital":
          return {
            ...baseEntry,
            type: "Hospital",
            discharge: {
              date: dischargeDate,
              criteria: dischargeCriteria,
            },
          };
        case "OccupationalHealthcare":
          return {
            ...baseEntry,
            type: "OccupationalHealthcare",
            employerName,
            sickLeave:
              sickLeaveStartDate && sickLeaveEndDate
                ? {
                    startDate: sickLeaveStartDate,
                    endDate: sickLeaveEndDate,
                  }
                : undefined,
          };
      }
    };

    const createEntry = async () => {
      try {
        const entry = await patientService.createEntry(patientId, newEntry());

        handleCreatedEntry(entry);
        reset();
      } catch (error: unknown) {
        setErrorMessage(getAxiosErrorMessage(error));
      }
    };

    void createEntry();
  };

  return (
    <Box>
      {errorMessage && (
        <Alert severity="error" sx={{ marginBottom: 1 }}>
          {errorMessage}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <InputLabel id="entry-type-label">Entry Type</InputLabel>
          <Select
            labelId="entry-type-label"
            label="Entry Type"
            value={type}
            onChange={({ target }) => setType(target.value)}
          >
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="OccupationalHealthcare">
              Occupational Healthcare
            </MenuItem>
            <MenuItem value="HealthCheck">Health Check</MenuItem>
          </Select>
        </FormControl>

        <TextField
          sx={{ marginTop: 1 }}
          type="date"
          label="Date"
          required
          value={date}
          onChange={({ target }) => setDate(target.value)}
          fullWidth
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
          label="Specialist"
          required
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          fullWidth
        />
        <TextField
          sx={{ marginTop: 1 }}
          label="Description"
          required
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          fullWidth
        />
        <FormControl fullWidth sx={{ marginTop: 1 }}>
          <InputLabel id="diagnosis-codes-label">Diagnosis Codes</InputLabel>
          <Select
            labelId="diagnosis-codes-label"
            label="Diagnosis Codes"
            value={diagnosisCodes}
            renderValue={(selected) => selected.join(" — ")}
            multiple
            onChange={({ target: { value } }) => {
              setDiagnosisCodes(
                typeof value === "string" ? value.split(",") : value,
              );
            }}
            fullWidth
          >
            {diagnoses.map(({ code, name }) => (
              <MenuItem key={code} value={code}>
                {code} — {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {type === "HealthCheck" && (
          <HealthCheckForm
            healthCheckRating={healthCheckRating}
            setHealthCheckRating={setHealthCheckRating}
          />
        )}

        {type === "Hospital" && (
          <HospitalForm
            dischargeDate={dischargeDate}
            dischargeCriteria={dischargeCriteria}
            setDischargeDate={setDischargeDate}
            setDischargeCriteria={setDischargeCriteria}
          />
        )}

        {type === "OccupationalHealthcare" && (
          <OccupationalHealthcareForm
            employerName={employerName}
            sickLeaveStartDate={sickLeaveStartDate}
            sickLeaveEndDate={sickLeaveEndDate}
            setEmployerName={setEmployerName}
            setSickLeaveStartDate={setSickLeaveStartDate}
            setSickLeaveEndDate={setSickLeaveEndDate}
          />
        )}

        <Grid
          container
          columnGap={2}
          sx={{ marginTop: 1, width: "fit-content" }}
        >
          <Grid size="auto">
            <Button type="submit" variant="contained">
              Add New Entry
            </Button>
          </Grid>
          <Grid size="auto">
            <Button
              color="primary"
              type="button"
              variant="outlined"
              onClick={() => reset()}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default NewEntryForm;
