import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./Editable.scss";

export default function Editable() {
  const [input, setInput] = useState("");
  return (
    <section>
      <h2>Editable</h2>

      <ReactMarkdown children={input} />

      <div className="editable-container">
        <div
          className="editable"
          spellCheck="true"
          data-text="Write something here..."
          data-content-editable-leaf="true"
          contentEditable="true"
          style={{ outline: "none" }}
          onInput={(e) => {
            setInput(e.currentTarget.innerText);
          }}
        ></div>
      </div>
    </section>
  );
}
