import { closestCorners, DndContext } from "@dnd-kit/core";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import { SortableContext, useSortable, arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";

interface CardProps {
  id: string;
}

export default function Kanban() {
  const [newTask, setNewTask] = useState("");

  const [items, setItems] = useState({
    ToDo: ["Create new taks"],
    Doing: ["Fixing bugs"],
    Done: ["Learn React", "Finish Kanban"],
  });

  return (
    <section>
      <h2 className="title">Kanban</h2>
      <div className="kanban">
        <KanbanInput
          newTask={newTask}
          setNewTask={setNewTask}
          setItems={setItems}
        />
        <div className="columns-container">
          <DndContext
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <Container id="ToDo" items={items.ToDo} />
            <Container id="Doing" items={items.Doing} />
            <Container id="Done" items={items.Done} />
          </DndContext>
        </div>
      </div>
    </section>
  );

  function findContainer(id: string) {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) => items[key].includes(id));
  }

  function handleDragStart(event: any) {
    const { active } = event;
    const { id } = active;
  }

  function handleDragOver(event: any) {
    const {
      active,
      over,
      activatorEvent,
    }: { active: any; over: any; activatorEvent: any } = event;
    const { id } = active;
    const { id: overId } = over;

    // Find the containers
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setItems((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.indexOf(id);
      const overIndex = overItems.indexOf(overId);

      let newIndex;
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1 &&
          activatorEvent.offsetTop > over.rect.offsetTop + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item !== active.id),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
  }

  function handleDragEnd(event: any): void {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = items[activeContainer].indexOf(active.id);
    const overIndex = items[overContainer].indexOf(overId);

    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(
          items[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }
  }
}

function Container(props: { id: string; items: string[] }) {
  const { id, items } = props;

  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <SortableContext id={id} items={items}>
      <div className={"column-container" + " " + id} ref={setNodeRef}>
        <h3>{id}</h3>
        {items.map((id) => (
          <SortableItem key={id} id={id} />
        ))}
      </div>
    </SortableContext>
  );
}

function SortableItem(props: CardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "15px",
  };

  return (
    <div
      className="sortable-item"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {props.id}
    </div>
  );
}

function KanbanInput({
  newTask,
  setNewTask,
  setItems,
}: {
  newTask: string;
  setNewTask: (newTask: string) => void;
  setItems: (items: any) => void;
}) {
  return (
    <div className="new-task-form">
      New Task:
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button
        className="btn-secondary"
        onClick={() =>
          setItems((items: any) => ({
            ...items,
            ToDo: [...items.ToDo, newTask],
          }))
        }
      >
        Add
      </button>
    </div>
  );
}
