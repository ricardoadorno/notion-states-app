import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface RowType {
  [key: string]: string;
}

export default function Table() {
  const [parent] = useAutoAnimate();
  const [isEditingRow, setIsEditingRow] = useState(false);
  const [editingHeader, setEditingHeader] = useState({
    isEditing: false,
    headerSelected: "",
    editing: "",
  });

  const [rows, setRows] = useState<RowType[]>([
    { firstName: "John", lastName: "Doe" },
    { firstName: "Mary", lastName: "Moe" },
    { firstName: "July", lastName: "Dooley" },
  ]);
  const [headers, setHeaders] = useState<string[]>(["First Name", "Last Name"]);

  const addRow = () => {
    setRows([
      ...rows,
      headers.reduce((acc, header) => {
        acc[header] = "None";
        return acc;
      }, {} as RowType),
    ]);
  };

  const addColumn = () => {
    setHeaders([...headers, `Column ${headers.length + 1}`]);
    setRows(
      rows.map((row) => ({ ...row, [`column${headers.length + 1}`]: "None" }))
    );
  };

  const updateRow = (index: number, field: string, value: string) => {
    setRows(
      rows.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };

  const updateHeader = (index: number, value: string) => {
    setHeaders(headers.map((header, i) => (i === index ? value : header)));
  };

  return (
    <section>
      <h2 className="title">Table</h2>
      <div className="container-table">
        <table>
          <thead>
            <tr ref={parent}>
              {headers.map((header) => (
                <th
                  onClick={() => {
                    setEditingHeader({
                      isEditing: true,
                      headerSelected: header,
                      editing: header,
                    });
                  }}
                  key={header}
                >
                  {editingHeader.isEditing &&
                  editingHeader.headerSelected === header ? (
                    <input
                      type="text"
                      value={editingHeader.editing}
                      onChange={(e) =>
                        setEditingHeader({
                          ...editingHeader,
                          editing: e.target.value,
                        })
                      }
                      onBlur={(e) => {
                        updateHeader(headers.indexOf(header), e.target.value);
                        setEditingHeader({
                          ...editingHeader,
                          isEditing: false,
                        });
                      }}
                    />
                  ) : (
                    header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody ref={parent}>
            {rows.map((row, index) => (
              <tr key={index}>
                {Object.entries(row).map(([field, value]) => (
                  <td onClick={() => setIsEditingRow(true)} key={field}>
                    {isEditingRow ? (
                      <input
                        type="text"
                        value={value}
                        onChange={(e) =>
                          updateRow(index, field, e.target.value)
                        }
                        onBlur={() => setIsEditingRow(false)}
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
