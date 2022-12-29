// TODO add copy to clipboard button
// TODO add caption

import { plugins } from "prismjs";
import React, { useEffect, useState } from "react";

export default function CodeBlock() {
  const [isEditing, setIsEditing] = useState(false);

  const [codeState, setCodeState] = useState(
    `function add(a, b) { retun a + b; }`
  );

  return (
    <div className="flex flex-col ">
      <div className="bg-gray-800 p-4 rounded mx-4 mt-4">
        <div className="text-gray-200 py-3 ">Javascript</div>
        {isEditing ? (
          <form onSubmit={() => setIsEditing(!isEditing)}>
            <input
              type="text"
              className="bg-gray-800 text-gray-200 w-full outline-none
            "
              value={codeState}
              onChange={(e) => setCodeState(e.target.value)}
            />
          </form>
        ) : (
          <pre
            onClick={() => setIsEditing(!isEditing)}
            className="text-gray-200"
          >
            <code className="language-javascript">{codeState}</code>
          </pre>
        )}
      </div>
      <div className="text-red-700 ml-4">This code outputs the results</div>
    </div>
  );
}
