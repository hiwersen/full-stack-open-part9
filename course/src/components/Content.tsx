import { type ContentProps } from "../types";
import Part from "./Part";

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div style={{ display: "grid", gap: "1em" }}>
      {courseParts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
};

export default Content;
