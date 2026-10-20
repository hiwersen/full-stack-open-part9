import {
  Typography,
  Button,
  TextField,
  Grid,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import patientService from "../../services/patients";
import {
  NewEntry,
  Entry,
  HealthCheckRating,
  BaseEntry,
  Diagnosis,
} from "../../types";
import React, { useState } from "react";
import axios from "axios";

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
  const [healthCheckRating, setHealthCheckRating] = useState(0);
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
    setHealthCheckRating(0);
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
            healthCheckRating: Number(healthCheckRating) as HealthCheckRating,
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
        console.dir(error);
        if (axios.isAxiosError(error)) {
          if (error?.response?.data) {
            const message = error.response.data.error[0].message;
            const path = error.response.data.error[0].path[0];
            setErrorMessage(`${message}${path && " at " + path + " field"}`);
          } else {
            setErrorMessage("Unrecognized axios error");
          }
        } else {
          console.error("Unknown error", error);
          setErrorMessage("Unknown error");
        }
      }
    };

    void createEntry();
  };

  return (
    <div>
      <Typography component="h3" variant="h6" sx={{ p: "1em 0" }}>
        New Entry
      </Typography>
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
            <MenuItem key="Hospital" value="Hospital">
              Hospital
            </MenuItem>
            <MenuItem
              key="OccupationalHealthcare"
              value="OccupationalHealthcare"
            >
              Occupational Healthcare
            </MenuItem>
            <MenuItem key="HealthCheck" value="HealthCheck">
              Health Check
            </MenuItem>
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
          <FormControl fullWidth sx={{ marginTop: 1 }}>
            <InputLabel id="rating-label">Health Check Rating</InputLabel>
            <Select
              labelId="rating-label"
              label="Health Check Rating"
              required
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
        )}

        {type === "Hospital" && (
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
              label="Discharge Criteria"
              required
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
              fullWidth
            />
          </>
        )}

        {type === "OccupationalHealthcare" && (
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
              label="Sick Leave End Date"
              type="date"
              value={sickLeaveEndDate}
              onChange={({ target }) => setSickLeaveEndDate(target.value)}
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
          </>
        )}

        <Grid
          container
          columnGap={2}
          sx={{ marginTop: 1, width: "fit-content" }}
        >
          <Grid size="auto">
            <Button type="submit" variant="contained">
              Add
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
    </div>
  );
};

export default NewEntryForm;
