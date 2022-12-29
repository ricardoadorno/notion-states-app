import React from "react";

export default function Header({
  onAddTask,
}: {
  onAddTask: (taskText: string) => void;
}) {
  const [taskText, setTaskText] = React.useState("");

  function handleAddTask(e: React.SyntheticEvent) {
    e.preventDefault();
    onAddTask(taskText);
    setTaskText("");
  }

  return (
    <>
      <div className="container mx-auto flex justify-center">
        <form className="w-full max-w-sm" onSubmit={handleAddTask}>
          <div className="flex items-center border-b  border-teal-500 py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Add a new todo"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
            />
            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="submit"
            >
              Add +
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
