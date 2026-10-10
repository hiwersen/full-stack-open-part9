import { type PartProps, type CoursePartBase } from "../types.ts";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member ${JSON.stringify(value)}`,
  );
};

const PartHeader = ({ name, exerciseCount }: CoursePartBase) => {
  return (
    <div style={{ fontWeight: "bold" }}>
      {name} {exerciseCount}
    </div>
  );
};

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <PartHeader name={part.name} exerciseCount={part.exerciseCount} />
          <div style={{ fontStyle: "italic" }}>{part.description}</div>
        </div>
      );
    case "group":
      return (
        <div>
          <PartHeader name={part.name} exerciseCount={part.exerciseCount} />
          <div>group project count: {part.groupProjectCount}</div>
        </div>
      );
    case "background":
      return (
        <div>
          <PartHeader name={part.name} exerciseCount={part.exerciseCount} />
          <div style={{ fontStyle: "italic" }}>{part.description}</div>
          <div>background material: {part.backgroundMaterial}</div>
        </div>
      );
    case "special":
      return (
        <div>
          <PartHeader name={part.name} exerciseCount={part.exerciseCount} />
          <div style={{ fontStyle: "italic" }}>{part.description}</div>
          <div>required skills: {part.requirements.join(", ")}</div>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
