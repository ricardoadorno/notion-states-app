import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

const MarkdownPreviewer = () => {
  const [markdown, setMarkdown] = useState("");

  return (
    <div className="flex flex-row pt-8 ">
      <textarea
        className="w-1/2 h-96  bg-gray-200 rounded resize-none focus:outline-none border-2 border-gray-700 p-4"
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        placeholder="Enter your Markdown here"
      />
      <div className="w-1/2 h-96 ml-4  bg-gray-200   p-4">
        <ReactMarkdown className="prose">{markdown}</ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownPreviewer;
