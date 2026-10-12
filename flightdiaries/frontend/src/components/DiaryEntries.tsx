import { type DiaryEntriesProps } from "../types";
import { type CSSProperties } from "react";

const padding: CSSProperties = { padding: "1em 0" };
const thStyle: CSSProperties = { ...padding, textAlign: "left" };
const tdStyle: CSSProperties = {
  ...padding,
  borderBottom: "1px solid lightGray",
};
const commentStyle: CSSProperties = {
  ...tdStyle,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const DiaryEntries = ({ diaryEntries }: DiaryEntriesProps) => {
  return (
    <table
      style={{
        width: "100%",
        tableLayout: "fixed",
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr>
          <th style={thStyle}>Date</th>
          <th style={thStyle}>Weather</th>
          <th style={thStyle}>Visibility</th>
          <th style={thStyle}>Comment</th>
        </tr>
      </thead>
      <tbody>
        {diaryEntries.map(({ id, date, weather, visibility, comment }) => {
          return (
            <tr key={id}>
              <td style={tdStyle}>{date}</td>
              <td style={tdStyle}>{weather}</td>
              <td style={tdStyle}>{visibility}</td>
              <td style={commentStyle}>{comment && comment}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DiaryEntries;
