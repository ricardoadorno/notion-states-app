import ToggleText from "./ToggleText";
import { useState } from "react";

type Toggle = {
  id: string;
  title: string;
  text: string;
  toggles: Toggle[];
};

function ToggleList() {
  const [mainToggle, setMainToggle] = useState<Toggle[]>([]);

  const createNewToggle = () => {
    setMainToggle([
      ...mainToggle,
      { id: crypto.randomUUID(), title: "", text: "", toggles: [] },
    ]);
  };

  return (
    <div className="flex flex-col gap-4 justify-start items-center">
      <button
        onClick={createNewToggle}
        className=" p-2 m-4 rounded max-w-md bg-cyan-500 hover:bg-cyan-700 border-cyan-500 hover:border-cyan-700 text-sm border-4 text-white py-1 px-2 "
      >
        Add Toggle
      </button>

      {mainToggle.map((toggle) => {
        return (
          <ToggleText
            key={toggle.id}
            id={toggle.id}
            title={toggle.title}
            text={toggle.text}
            toggles={toggle.toggles}
          />
        );
      })}
    </div>
  );
}

export default ToggleList;
