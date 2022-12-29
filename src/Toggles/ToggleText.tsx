import React, { useEffect, useState } from "react";

type NestedToggles = {
  id: string;
  text: string;
  title: string;
  NestedToggles?: NestedToggles[];
};

const createKey = () => Math.random().toString(36).substring(2, 15);

export default function ToggleText() {
  const [isToggled, setIsToggled] = useState(false);
  const [textAreaValues, setTextAreaValues] = useState("");

  // * Open and close the toggle
  function handleToggle() {
    setIsToggled(!isToggled);
  }
  // * Button to create a new nested toggle
  const createNestedToggle = () => {
    setNestedToggles([
      ...nestedToggles,
      { id: createKey(), text: "", title: "" },
    ]);
  };

  // * Nested Toggles State
  const [nestedToggles, setNestedToggles] = useState<NestedToggles[]>([]);

  return (
    <div className="flex flex-col gap-4 w-2/3 ">
      <div className="flex ">
        <button onClick={handleToggle}>
          {isToggled ? (
            <i className="fa fa-caret-down"></i>
          ) : (
            <i className="fa fa-caret-right "></i>
          )}{" "}
        </button>
        <input
          type="text"
          className="p-2 rounded-lg focus:outline-none  bg-transparent w-full placeholder:italic"
          placeholder="Enter an title here"
        />
      </div>
      {/* The Toggle is open */}
      {isToggled && (
        <div>
          <textarea
            className="p-2 rounded-lg focus:outline-none  bg-gray-100 resize-none w-full"
            value={textAreaValues}
            onChange={(e) => setTextAreaValues(e.target.value)}
          />
          <button className="p-2 font-bold mr-4" onClick={createNestedToggle}>
            + New List
          </button>

          {nestedToggles.map((toggle) => {
            return <ToggleText key={toggle.id} />;
          })}
        </div>
      )}
    </div>
  );
}
