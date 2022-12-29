import React from "react";

function Task({ task, onComplete, onDelete }: any) {
  return (
    <div className="flex justify-between items-center w-100 my-2">
      <button onClick={() => onComplete(task.id)}>
        {task.isCompleted ? (
          <i className="fas fa-circle "></i>
        ) : (
          <i className="far fa-circle "></i>
        )}
      </button>

      <p className={task.isCompleted && "line-through text-gray-600"}>
        {task.text}
      </p>
      <button onClick={() => onDelete(task.id)}>
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
}

export default Task;
