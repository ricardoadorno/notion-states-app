import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const TasksContainer = ({ setTasks, tasks }) => {
  const handleDragEnd = ({ destination, source }) => {
    // If the destination is not defined, return
    if (!destination) return;

    // If the destination is the same as the source, return
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // if the destination is not the same as the source, change the state
    if (destination.droppableId !== source.droppableId) {
      const newTasks = { ...tasks };
      const sourceTask = newTasks[source.droppableId].items;
      const destinationTask = newTasks[destination.droppableId].items;
      const [removed] = sourceTask.splice(source.index, 1);
      destinationTask.splice(destination.index, 0, removed);
      setTasks(newTasks);
    }
  };

  return (
    <div className="flex align-center justify-between min-h-full">
      <DragDropContext onDragEnd={handleDragEnd}>
        {Object.entries(tasks).map((task) => (
          <div
            className={`${task[1].title.toLowerCase()}__wrapper`}
            key={task[1].title}
          >
            <h3>{task[1].title} Tasks</h3>

            <div className={`${task[1].title.toLowerCase()}__container`}>
              <Droppable droppableId={task[1].title}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {task[1].items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`${task[1].title.toLowerCase()}__items`}
                          >
                            <p>{item.title}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
};

export default TasksContainer;
