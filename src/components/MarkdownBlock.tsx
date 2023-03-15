import { useState } from "react";
import ReactMarkdown from "react-markdown";

function MarkdownBlock() {
  const [markdownContent, setMarkdownContent] = useState("");

  const [addMarkdownContent, setAddMarkdownContent] = useState(false);
  const [editMarkdownContent, setEditMarkdownContent] = useState({
    isEdit: false,
    inputContent: "",
    markdownType: "",
  });

  function handleMarkdownSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    switch (e.target.value) {
      case "normal":
        setEditMarkdownContent({
          isEdit: true,
          inputContent: "",
          markdownType: "",
        });
        break;
      case "h1":
        setEditMarkdownContent({
          isEdit: true,
          inputContent: "",
          markdownType: "# ",
        });
        break;
      case "blockquote":
        setEditMarkdownContent({
          isEdit: true,
          inputContent: "",
          markdownType: "> ",
        });
        break;
      case "ordered-list":
        setEditMarkdownContent({
          isEdit: true,
          inputContent: "",
          markdownType: "1. ",
        });
        break;
      case "unordered-list":
        setEditMarkdownContent({
          isEdit: true,
          inputContent: "",
          markdownType: "- ",
        });
        break;
      case "horizontal-rule":
        setMarkdownContent((prev) => prev + "---" + "\n");
        break;

      default:
        break;
    }
    setAddMarkdownContent(false);
  }

  return (
    <section>
      <h2>Markdown</h2>
      <ReactMarkdown children={markdownContent} />

      <div className="markdown">
        <div
          className="add-markdown"
          onClick={() => setAddMarkdownContent(!addMarkdownContent)}
        >
          <i className="fas fa-pen"></i>
        </div>

        {addMarkdownContent && (
          <div>
            <select onChange={(e) => handleMarkdownSelect(e)}>
              <option value="" disabled selected>
                Select a text type
              </option>
              <option value="normal">Normal text</option>
              <option value="h1">Header 1</option>
              <option value="blockquote">Blockquote</option>
              <option value="ordered-list">Ordered list</option>
              <option value="unordered-list">Unordered list</option>
              <option value="horizontal-rule">Horizontal rule</option>
            </select>
          </div>
        )}

        {editMarkdownContent.isEdit && (
          <form>
            <input
              type="text"
              onChange={(e) => {
                setEditMarkdownContent((prev) => {
                  return {
                    ...prev,
                    inputContent: e.target.value,
                  };
                });
              }}
              value={editMarkdownContent.inputContent}
            />
            <button
              onClick={() => {
                setMarkdownContent(
                  (prev) =>
                    prev +
                    editMarkdownContent.markdownType +
                    editMarkdownContent.inputContent +
                    "\n"
                );
                setEditMarkdownContent({
                  isEdit: false,
                  inputContent: "",
                  markdownType: "",
                });
              }}
            >
              Add
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default MarkdownBlock;
