import React from "react";
import ToggleText from "./ToggleText";

type Toggle = {
  id: string;
  text: string;
};

function ToggleList() {
  const [toggles, setToggles] = React.useState<Toggle[]>([]);

  const createKey = () => Math.random().toString(36).substring(2, 15);

  const createNewToggle = () => {
    setToggles([...toggles, { id: createKey(), text: "" }]);
  };

  return (
    <div className="flex flex-col gap-4 justify-start items-center">
      <button
        onClick={createNewToggle}
        className=" p-2 m-4 rounded max-w-md bg-cyan-500 hover:bg-cyan-700 border-cyan-500 hover:border-cyan-700 text-sm border-4 text-white py-1 px-2 "
      >
        Add Toggle
      </button>
      {toggles.map((toggle) => {
        return <ToggleText key={toggle.id} />;
      })}
    </div>
  );
}

export default ToggleList;
