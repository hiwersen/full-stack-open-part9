export interface CoursePart {
  name: string;
  exerciseCount: number;
}

export interface ContentProps {
  courseParts: CoursePart[];
}

export interface TotalProps {
  totalExercises: number;
}

export interface HeaderProps {
  courseName: string;
}
