import { useEffect, useState } from "react";

type Toggle = {
  id: string;
  title: string;
  text: string;
  toggles: Toggle[];
};

export default function ToggleText({ id, title, text, toggles }) {
  const [isToggled, setIsToggled] = useState(false);
  const [inputValues, setInputValues] = useState(title);
  const [textAreaValues, setTextAreaValues] = useState(text);

  const [togglesList, setTogglesList] = useState<Toggle[]>(toggles);

  const createNewToggle = () => {
    setTogglesList([
      ...togglesList,
      { id: crypto.randomUUID(), title: "", text: "", toggles: [] },
    ]);
  };

  function handleToggle() {
    setIsToggled(!isToggled);
  }

  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex ">
        <button onClick={handleToggle}>
          {isToggled ? (
            <i className="fa fa-caret-down"></i>
          ) : (
            <i className="fa fa-caret-right "></i>
          )}{" "}
        </button>
        {/* Title */}
        <input
          type="text"
          value={inputValues}
          onChange={(e) => setInputValues(e.target.value)}
          className="p-2 rounded-lg focus:outline-none  bg-transparent w-full placeholder:italic"
          placeholder="Enter an title here"
        />
      </div>
      {/* Text*/}
      {isToggled && (
        <div>
          <textarea
            className="p-2 rounded-lg focus:outline-none  bg-gray-100 resize-none w-full"
            value={textAreaValues}
            onChange={(e) => setTextAreaValues(e.target.value)}
          />
          {/* New Toggles */}
          <button className="p-2 font-bold mr-4" onClick={createNewToggle}>
            + New List
          </button>
          {togglesList.map((toggle) => {
            return (
              <ToggleText
                key={toggle.id}
                id={toggle.id}
                title={inputValues}
                text={textAreaValues}
                toggles={toggle.toggles}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
