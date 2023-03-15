import { useState } from "react";
import { nanoid } from "nanoid";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Table() {
  const [isEditingHeader, setIsEditingHeader] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [rows, setRows] = useState([
    { firstName: "John", lastName: "Doe" },
    { firstName: "Mary", lastName: "Moe" },
    { firstName: "July", lastName: "Dooley" },
  ]);
  const [headers, setHeaders] = useState(["First Name", "Last Name"]);

  const addRow = () => {
    setRows([...rows, { firstName: "None", lastName: "None" }]);
  };

  const addColumn = () => {
    setHeaders([...headers, `Column ${headers.length + 1}`]);
    setRows(
      rows.map((row) => ({ ...row, [`column${headers.length + 1}`]: "" }))
    );
  };

  const updateRow = (index, field, value) => {
    setRows(
      rows.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };

  const updateHeader = (index, value) => {
    setHeaders(headers.map((header, i) => (i === index ? value : header)));
  };

  return (
    <section>
      <h2>Table</h2>
      <div className="container-table">
        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                <th
                  onClick={() => {
                    setIsEditingHeader(true);
                  }}
                  key={header}
                >
                  {isEditingHeader ? (
                    <input
                      type="text"
                      value={header}
                      onChange={(e) =>
                        updateHeader(headers.indexOf(header), e.target.value)
                      }
                      onBlur={() => setIsEditingHeader(false)}
                    />
                  ) : (
                    header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                {Object.entries(row).map(([field, value]) => (
                  <td onClick={() => setIsEditing(true)} key={field}>
                    {isEditing ? (
                      <input
                        type="text"
                        value={value}
                        onChange={(e) =>
                          updateRow(index, field, e.target.value)
                        }
                        onBlur={() => setIsEditing(false)}
                      />
                    ) : (
                      value
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={addRow}>Add Row</button>
      <button className="ml-1" onClick={addColumn}>
        Add Column
      </button>
    </section>
  );
}

// interface SortList {
//   id: string;
//   name: string;
//   taskType: string;
// }
// function SortList() {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const selectRef = useRef<HTMLSelectElement>(null);
//   const [sortList, setSortList] = useState<SortList[]>([]);

//   function handleNewTask(e: React.FormEvent) {
//     e.preventDefault();

//     const newTask = {
//       id: nanoid(),
//       name: inputRef.current?.value,
//       taskType: selectRef.current?.value,
//     };
//     setSortList([...sortList, newTask]);
//   }

//   function handleDeleteTask(id: string) {
//     setSortList((prev) => prev.filter((task) => task.id !== id));
//   }

//   function handleDragEnd(e) {
//     const { active, over } = e;
//     if (active.id !== over.id) {
//       setSortList((prev) => {
//         const prevIndex = prev.findIndex((item) => item.id === active.id);
//         const nextIndex = prev.findIndex((item) => item.id === over.id);
//         const next = [...prev];
//         next.splice(prevIndex, 1);
//         next.splice(nextIndex, 0, prev[prevIndex]);
//         return next;
//       });
//     }
//   }

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   return (
//     <article>
//       <p>Sort List</p>
//       <form onSubmit={handleNewTask}>
//         <input type="text" ref={inputRef} />
//         <select id="sort" ref={selectRef}>
//           <option value="Health">Health</option>
//           <option value="Work">Work</option>
//         </select>
//         <button type="submit">+</button>
//       </form>
//       ---
//       <div>
//         <DndContext
//           sensors={sensors}
//           collisionDetection={closestCenter}
//           onDragEnd={handleDragEnd}
//         >
//           <SortableContext items={sortList}>
//             {sortList.map((task) => (
//               <div className="grid">
//                 <SortableItem
//                   key={task.id}
//                   name={task.name}
//                   id={task.id}
//                   type={task.taskType}
//                 />

//                 <i onClick={() => handleDeleteTask(task.id)}>X</i>
//               </div>
//             ))}
//           </SortableContext>
//         </DndContext>
//       </div>
//     </article>
//   );
// }

// function SortableItem(props) {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: props.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     backgroundColor: handleColor(props.type),
//     boxShadow: "none",
//     border: "0",
//   };

//   function handleColor(type) {
//     switch (type) {
//       case "Health":
//         return "lightgreen";
//       case "Work":
//         return "lightblue";
//       default:
//         return "red";
//     }
//   }

//   return (
//     <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
//       {props.name}
//     </div>
//   );
// }

// function Droppable(props) {
//   const { setNodeRef } = useDroppable({
//     id: "unique-id",
//   });

//   return <div ref={setNodeRef}>{props.content}</div>;
// }

// function WeekTable() {
//   const [timeBlock, setTimeBlock] = useState(
//     Array.from({ length: 12 }, (_, i) => i + 1)
//   );

//   return (
//     <div>
//       <table>
//         <thead>
//           <tr>
//             <td></td>
//             <th>Monday</th>
//             <th>Tuesday</th>
//             <th>Wednesday</th>
//             <th>Thursday</th>
//             <th>Friday</th>
//             <th>Saturday</th>
//             <th>Sunday</th>
//           </tr>
//         </thead>
//         <tbody>
//           {timeBlock.map((time) => (
//             <tr>
//               <td>{time}:00</td>
//               <td>
//                 {time}
//                 <Droppable content="some" />
//               </td>
//               <td>{time}</td>
//               <td>{time}</td>
//               <td>{time}</td>
//               <td>{time}</td>
//               <td>{time}</td>
//               <td>{time}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
