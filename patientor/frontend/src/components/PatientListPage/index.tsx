import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Table,
  Button,
  TableHead,
  Typography,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";

import type { NewPatient, PatientSummary } from "../../types";
import AddPatientModal from "../AddPatientModal";

import HealthRatingBar from "../HealthRatingBar";

import patientService from "../../services/patients";
import { getAxiosErrorMessage } from "../../utils";

interface Props {
  patients: PatientSummary[];
  setPatients: React.Dispatch<React.SetStateAction<PatientSummary[]>>;
}

const PatientListPage = ({ patients, setPatients }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setErrorMessage(undefined);
  };

  const submitNewPatient = async (newPatient: NewPatient) => {
    try {
      const { ssn, entries, ...patientSummary } =
        await patientService.create(newPatient);
      setPatients((prev) => prev.concat(patientSummary));
      closeModal();
    } catch (error: unknown) {
      setErrorMessage(getAxiosErrorMessage(error));
    }
  };

  return (
    <>
      <Box>
        <Typography align="center" variant="h6">
          Patient list
        </Typography>
      </Box>
      <Table sx={{ marginBottom: "1em" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>Health Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>
                <Link to={`/patients/${patient.id}`}>{patient.name}</Link>
              </TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.occupation}</TableCell>
              <TableCell>
                <HealthRatingBar showText={false} rating={1} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        errorMessage={errorMessage}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={openModal}>
        Add New Patient
      </Button>
    </>
  );
};

export default PatientListPage;
