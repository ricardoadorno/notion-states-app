import { useRef, useState } from "react";

import { useAutoAnimate } from "@formkit/auto-animate/react";

type Tasks = {
  id: string;
  text: string;
  isCompleted: boolean;
};

function ToDo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [tasks, setTasks] = useState<Tasks[]>([
    {
      id: "1",
      text: "Learn React",
      isCompleted: false,
    },
  ]);
  const [displayDone, setDisplayDone] = useState(true);

  // AutoAnimate
  const [parent] = useAutoAnimate();

  return (
    <div className="todo">
      <h2 className="title">ToDo</h2>

      <form
        className="todo--form"
        onSubmit={(e) => {
          e.preventDefault();
          const newTask = {
            id: Math.random().toString(),
            text: inputRef.current?.value as string,
            isCompleted: false,
          };
          setTasks([...tasks, newTask]);
          inputRef.current!.value = "";
        }}
      >
        <input type="text" ref={inputRef} />
        <button type="submit">Add Task</button>
      </form>

      <div className="todo--header">
        <h3>All Tasks: {tasks.length}</h3>
        <div className="todo--header_done">
          <label>
            <input
              type="checkbox"
              checked={displayDone}
              onChange={(e) => {
                setDisplayDone(e.target.checked);
              }}
            />
            Show Done
          </label>
          <div>
            Completed Tasks:{" "}
            {tasks.reduce((acc, task) => acc + (task.isCompleted ? 1 : 0), 0)}
          </div>
        </div>
      </div>
      <ul ref={parent}>
        {displayDone
          ? tasks.map((task) => (
              <li key={task.id}>
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() => {}}
                  onClick={() => {
                    const newTasks = [...tasks];
                    const index = newTasks.findIndex((t) => t.id === task.id);
                    newTasks[index].isCompleted = !newTasks[index].isCompleted;
                    setTasks(newTasks);
                  }}
                />
                <span
                  style={{
                    textDecoration: task.isCompleted ? "line-through" : "",
                  }}
                >
                  {task.text}
                </span>
                <i
                  className="fas fa-trash-alt"
                  onClick={() => {
                    const newTasks = [...tasks];
                    const index = newTasks.findIndex((t) => t.id === task.id);
                    newTasks.splice(index, 1);
                    setTasks(newTasks);
                  }}
                ></i>
              </li>
            ))
          : tasks.map((task) => {
              if (task.isCompleted) {
                return null;
              }

              return (
                <li key={task.id}>
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={() => {}}
                    onClick={() => {
                      const newTasks = [...tasks];
                      const index = newTasks.findIndex((t) => t.id === task.id);
                      newTasks[index].isCompleted =
                        !newTasks[index].isCompleted;
                      setTasks(newTasks);
                    }}
                  />
                  <span
                    style={{
                      textDecoration: task.isCompleted ? "line-through" : "",
                    }}
                  >
                    {task.text}
                  </span>
                  <i
                    className="fas fa-trash-alt"
                    onClick={() => {
                      const newTasks = [...tasks];
                      const index = newTasks.findIndex((t) => t.id === task.id);
                      newTasks.splice(index, 1);
                      setTasks(newTasks);
                    }}
                  ></i>
                </li>
              );
            })}

        {tasks.length === 0 && <span>Nothing to do!</span>}

        {!displayDone &&
          tasks.length > 0 &&
          tasks.every((task) => task.isCompleted) && (
            <li className="todo--empty">
              <i className="fas fa-check-circle"></i>
              <span>All Done</span>
            </li>
          )}

        {displayDone && tasks.find((task) => task.isCompleted) && (
          <li className="todo--clear">
            <button
              onClick={() => {
                setTasks(tasks.filter((task) => !task.isCompleted));
              }}
            >
              Clear Completed Tasks
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default ToDo;
