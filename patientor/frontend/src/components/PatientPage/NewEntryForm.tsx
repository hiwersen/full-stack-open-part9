import { Typography, Button, TextField, Grid, Alert } from "@mui/material";
import patientService from "../../services/patients";
import { NewEntry, Entry, HealthCheckRating } from "../../types";
import React, { useState } from "react";
import axios from "axios";

interface Props {
  patientId: string;
  handleCreatedEntry: (entry: Entry) => void;
}

const NewEntryForm = ({ patientId, handleCreatedEntry }: Props) => {
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [description, setDescription] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const reset = () => {
    setDate("");
    setSpecialist("");
    setDescription("");
    setDiagnosisCodes("");
    setHealthCheckRating("");
    setErrorMessage("");
  };

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const newEntry: NewEntry = {
      date,
      specialist,
      description,
      diagnosisCodes: diagnosisCodes.split(", "),
      type: "HealthCheck",
      healthCheckRating: Number(healthCheckRating) as HealthCheckRating,
    };

    const createEntry = async () => {
      try {
        const entry = await patientService.createEntry(patientId, newEntry);

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
        New HealthCheck Entry
      </Typography>
      {errorMessage && (
        <Alert severity="error" sx={{ marginBottom: 1 }}>
          {errorMessage}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="date*"
          value={date}
          placeholder="YYYY-MM-DD"
          onChange={({ target }) => setDate(target.value)}
          fullWidth
        />
        <TextField
          label="specialist*"
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          fullWidth
        />
        <TextField
          label="description*"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          fullWidth
        />
        <TextField
          label="Diagnosis Codes"
          value={diagnosisCodes}
          placeholder="comma-separated"
          onChange={({ target }) => setDiagnosisCodes(target.value)}
          fullWidth
        />
        <TextField
          label="Health Check Rating*"
          value={healthCheckRating}
          placeholder="(0-3)"
          onChange={({ target }) => setHealthCheckRating(target.value)}
          fullWidth
        />
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
