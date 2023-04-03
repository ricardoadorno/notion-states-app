import ReactMarkdown from "react-markdown";
import { useState } from "react";
import { nanoid } from "nanoid";

function handleType(type: string) {
  switch (type) {
    case "Header 1":
      return "# ";
    case "Header 2":
      return "## ";
    case "Header 3":
      return "### ";
    case "Ordered List":
      return "1. ";
    case "Unordered List":
      return "- ";
    default:
      return " ";
  }
}

export default function MarkdownNew() {
  const [allLines, setAllLines] = useState([
    {
      id: nanoid(),
      content: "www",
      type: "Header 1",
    },
    {
      id: nanoid(),
      content: "www",
      type: "Unordered List",
    },
  ]);

  return (
    <>
      {allLines.map((line) => {
        return (
          <Line
            content={line.content}
            type={line.type}
            key={line.id}
            setAllLines={setAllLines}
            allLines={allLines}
          />
        );
      })}
    </>
  );
}

function Line({ content, type, setAllLines }: any) {
  return (
    <div
      contentEditable
      onKeyDown={async (e) => {
        if (e.key === "Enter") {
          e.preventDefault();

          const createId = nanoid();
          setAllLines((prev: any) => {
            const newLine = {
              id: createId,
              content: "",
              type: type === "Unordered List" ? "Unordered List" : "",
            };
            return [...prev, newLine];
          });
        }
      }}
    >
      <ReactMarkdown>{handleType(type) + content}</ReactMarkdown>
    </div>
  );
}
