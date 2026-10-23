import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import patientServices from "../../services/patients";
import type { Diagnosis, Patient } from "../../types";
import GenderIcon from "../GenderIcon";
import {
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Box,
} from "@mui/material";

import NewEntryForm from "./NewEntryForm";
import EntryCard from "./EntryCard";

const PatientPage = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const fetchPatient = async () => {
      try {
        setPatient(await patientServices.get(id));
      } catch (error: unknown) {
        console.error(error);
      }
    };
    void fetchPatient();
  }, [id]);

  return (
    patient && (
      <>
        <Typography component="h2" variant="h4" sx={{ p: "1em 0" }}>
          {patient.name} <GenderIcon gender={patient.gender} />
        </Typography>

        <Table sx={{ width: "auto" }}>
          <TableBody>
            {patient.ssn && (
              <TableRow>
                <TableCell sx={{ pl: 0 }}>ssn</TableCell>
                <TableCell>{patient.ssn}</TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell sx={{ pl: 0 }}>occupation</TableCell>
              <TableCell>{patient.occupation}</TableCell>
            </TableRow>
            {patient.dateOfBirth && (
              <TableRow>
                <TableCell sx={{ pl: 0 }}>date of birth</TableCell>
                <TableCell>{patient.dateOfBirth}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Box>
          <Typography component="h3" variant="h6" sx={{ p: "1em 0" }}>
            New Entry
          </Typography>
          <NewEntryForm
            patientId={patient.id}
            handleCreatedEntry={(entry) => {
              setPatient(
                (prev) =>
                  prev && {
                    ...prev,
                    entries: [...(prev.entries ?? []), entry],
                  },
              );
            }}
            diagnoses={diagnoses}
          />
        </Box>

        {patient.entries && (
          <Box>
            <Typography component="h3" variant="h6" sx={{ p: "1em 0" }}>
              Entries
            </Typography>
            {patient.entries.map((entry) => (
              <EntryCard key={entry.id} entry={entry} diagnoses={diagnoses} />
            ))}
          </Box>
        )}
      </>
    )
  );
};

export default PatientPage;
