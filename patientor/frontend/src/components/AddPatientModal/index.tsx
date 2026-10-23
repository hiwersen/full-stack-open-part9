import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
} from "@mui/material";

import AddPatientForm from "./AddPatientForm";
import type { NewPatient } from "../../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (newPatient: NewPatient) => Promise<void>;
  errorMessage?: string;
}

const AddPatientModal = ({
  modalOpen,
  onClose,
  onSubmit,
  errorMessage,
}: Props) => (
  <Dialog fullWidth open={modalOpen} onClose={onClose}>
    <DialogTitle>Add a new patient</DialogTitle>
    <Divider />
    <DialogContent>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <AddPatientForm onSubmit={onSubmit} onCancel={onClose} />
    </DialogContent>
  </Dialog>
);

export default AddPatientModal;
