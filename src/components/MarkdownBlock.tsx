import { useState } from "react";
import ReactMarkdown from "react-markdown";

function MarkdownBlock() {
  const [markdownContent, setMarkdownContent] = useState("");
  const [inputContent, setInputContent] = useState({
    type: "",
    content: "",
  });

  return (
    <section>
      <h2>Markdown</h2>

      <ReactMarkdown children={markdownContent} />

      <div className="markdown">
        <form
          className="input-form"
          onSubmit={(e) => {
            e.preventDefault();
            setMarkdownContent(
              (prev) => prev + inputContent.type + inputContent.content + "\n"
            );
            setInputContent({ type: "", content: "" });
          }}
        >
          <input
            type="text"
            placeholder={inputContent.type}
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
              setInputContent({ type: "", content: "" });
            }}
          />
          <button className="btn-secondary" type="submit">
            Submit
          </button>
        </form>

        <div className="btn-group">
          <button onClick={() => setInputContent({ type: "", content: "" })}>
            Clear
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
          <button
            onClick={() =>
              setInputContent((prev) => {
                return { ...prev, type: "> " };
              })
            }
          >
            Blockquote
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
