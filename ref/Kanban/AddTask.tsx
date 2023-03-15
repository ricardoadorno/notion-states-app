import React, { useState } from "react";

const AddTask = ({ setTasks, fetchID, tasks }) => {
  const [task, setTask] = useState("");

  const handleAddTodo = (e) => {
    e.preventDefault();
    setTasks({
      ...tasks,
      pending: {
        title: "pending",
        items: [
          ...tasks.pending.items,
          {
            id: fetchID(),
            title: task,
          },
        ],
      },
    });
  };
  return (
    <form
      className="flex flex-row justify-center p-6 "
      onSubmit={handleAddTodo}
    >
      <input
        className=" p-2 rounded-l-xl outline-none"
        type="text"
        name="task"
        id="task"
        aria-label="Add Todo"
        placeholder="New Task..."
        value={task}
        required
        onChange={(e) => setTask(e.target.value)}
      />
      <button
        type="submit"
        className=" p-2 rounded-r-xl bg-cyan-500 hover:bg-cyan-700 border-cyan-500 hover:border-cyan-700 text-sm border-4 text-white py-1 px-2 "
      >
        Add Task +
      </button>
    </form>
  );
};

export default AddTask;
