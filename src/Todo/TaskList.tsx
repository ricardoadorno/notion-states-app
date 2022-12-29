import React, { useEffect } from "react";
import Task from "./Task";

function TaskList({ tasks, onComplete, onDelete }: any) {
  const taskNumber = tasks.length;
  const completedTasks = tasks.filter((task: any) => task.isCompleted).length;

  return (
    <section className="container mx-auto max-w-xl p-4 m-4 bg-gray-200 rounded">
      <header className="flex justify-between ">
        <div>
          <p>All Tasks: </p>
          <span>{taskNumber}</span>
        </div>

        <div>
          <p>Compleated Tasks: </p>
          <span>
            {completedTasks} of {taskNumber}
          </span>
        </div>
      </header>

      <hr className="my-4 border-gray-800" />

      {tasks.map((task: any) => (
        <Task
          key={task.id}
          task={task}
          onComplete={onComplete}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}

export default TaskList;
