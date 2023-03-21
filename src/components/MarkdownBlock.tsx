import { useState } from "react";
import ReactMarkdown from "react-markdown";

function MarkdownBlock() {
  const [markdownContent, setMarkdownContent] = useState("");
  const [inputContent, setInputContent] = useState({
    type: "",
    content: "",
  });

  function handleTypeDescription(type: string) {
    switch (type) {
      case "# ":
        return "Header 1";
      case "## ":
        return "Header 2";
      case "### ":
        return "Header 3";
      case "1. ":
        return "Ordered List";
      case "- ":
        return "Unordered List";
      default:
        return " ";
    }
  }

  return (
    <section>
      <h2 className="title">Markdown</h2>
      <ReactMarkdown children={markdownContent} />
      <div className="markdown">
        <form
          className="input-form"
          onSubmit={(e) => {
            e.preventDefault();
            setMarkdownContent(
              (prev) => prev + inputContent.type + inputContent.content + "\n"
            );
            setInputContent({ ...inputContent, content: "" });
          }}
        >
          <input
            type="text"
            placeholder={handleTypeDescription(inputContent.type)}
            onChange={(e) =>
              setInputContent((prev) => {
                return { ...prev, content: e.target.value };
              })
            }
            value={inputContent.content}
            onBlur={() => {
              setMarkdownContent(
                (prev) => prev + inputContent.type + inputContent.content + "\n"
              );
              setInputContent({ ...inputContent, content: "" });
            }}
          />
          <button className="btn-secondary" type="submit">
            Submit
          </button>
        </form>

        <div className="btn-group">
          <button onClick={() => setInputContent({ type: "", content: "" })}>
            Normal Text
          </button>
          <button
            onClick={() =>
              setInputContent((prev) => {
                return { ...prev, type: "# " };
              })
            }
          >
            Header 1
          </button>
          <button
            onClick={() =>
              setInputContent((prev) => {
                return { ...prev, type: "## " };
              })
            }
          >
            Header 2
          </button>
          <button
            onClick={() =>
              setInputContent((prev) => {
                return { ...prev, type: "### " };
              })
            }
          >
            Header 3
          </button>
          <button
            onClick={() =>
              setInputContent((prev) => {
                return { ...prev, type: "- " };
              })
            }
          >
            Unordered list
          </button>
          <button
            onClick={() =>
              setInputContent((prev) => {
                return { ...prev, type: "1. " };
              })
            }
          >
            Ordered list
          </button>
          <button onClick={() => setMarkdownContent((prev) => prev + "--- \n")}>
            Horizontal rule
          </button>
        </div>
      </div>
    </section>
  );
}

export default MarkdownBlock;
