import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import patientServices from "../services/patients";
import type { Patient } from "../types";
import GenderIcon from "./GenderIcon";
import {
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

const PatientPage = () => {
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
        {patient.entries && (
          <>
            <Typography component="h3" variant="h6" sx={{ p: "1em 0" }}>
              entries
            </Typography>
            {patient.entries?.map((entry) => (
              <div key={entry.id}>
                <p>
                  {entry.date} {entry.description}
                </p>
                {entry.diagnosisCodes && (
                  <ul>
                    {entry.diagnosisCodes?.map((code) => (
                      <li key={code}>{code}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </>
        )}
      </>
    )
  );
};

export default PatientPage;
