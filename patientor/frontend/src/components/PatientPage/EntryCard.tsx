import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import type { Diagnosis, Entry } from "../../types";
import EntryDetails from "./EntryDetails";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const EntryCard = ({ entry, diagnoses }: Props) => {
  return (
    <Card variant="outlined" sx={{ marginBottom: 1 }}>
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            {entry.date}
          </Typography>

          <Typography>{entry.description}</Typography>

          {entry.diagnosisCodes && (
            <List>
              {entry.diagnosisCodes.map((code) => {
                const diagnosis = diagnoses.find((d) => d.code === code);
                return (
                  <ListItem key={code} disablePadding>
                    <ListItemText primary={`${code} ${diagnosis?.name}`} />
                  </ListItem>
                );
              })}
            </List>
          )}

          <EntryDetails entry={entry} />

          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Diagnosed by {entry.specialist}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default EntryCard;
