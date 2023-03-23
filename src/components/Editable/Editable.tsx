import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./Editable.scss";

export default function Editable() {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("WW");

  return (
    <section>
      <h2>Editable</h2>

      <div className="editable-container">
        <ReactMarkdown children={value} />

        <div
          className="editable"
          spellCheck="true"
          // data-text="Write something here..."
          data-content-editable-leaf="true"
          contentEditable="true"
          style={{ outline: "none" }}
          ref={ref}
          onInput={(e) => setValue(e.currentTarget.innerText)}
        ></div>
      </div>
    </section>
  );
}
