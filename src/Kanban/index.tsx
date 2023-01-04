import React, { useState } from "react";
import AddTask from "./AddTask";
import TasksContainer from "./TasksContainer";
import "./mycss.css";

export default () => {
  const fetchID = () => Math.random().toString(36).substring(2, 10);
  const [tasks, setTasks] = useState({
    pending: {
      title: "pending",

      items: [
        {
          id: fetchID(),
          title: "Create Kanban board",
        },
      ],
    },

    ongoing: {
      title: "ongoing",

      items: [
        {
          id: fetchID(),
          title: "Fixing bugs",
        },
      ],
    },

    completed: {
      title: "completed",

      items: [
        {
          id: fetchID(),
          title: "Deploy to production",
        },
      ],
    },
  });

  return (
    <section className="container mx-auto max-w-xl p-4 m-4 bg-gray-200 rounded">
      <h2 className="text-2xl text-center">Kanban</h2>
      <div className="flex flex-col">
        <AddTask setTasks={setTasks} tasks={tasks} fetchID={fetchID} />
        <TasksContainer setTasks={setTasks} tasks={tasks} />
      </div>
    </section>
  );
};
