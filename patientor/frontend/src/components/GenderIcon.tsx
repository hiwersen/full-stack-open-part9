import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { Gender } from "../types";

const icons: Record<Gender, React.ReactElement> = {
  [Gender.Male]: <MaleIcon />,
  [Gender.Female]: <FemaleIcon />,
  [Gender.Other]: <TransgenderIcon />,
};

const GenderIcon = ({ gender }: { gender: Gender }) => icons[gender];

export default GenderIcon;
