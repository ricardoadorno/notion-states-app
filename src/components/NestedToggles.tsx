import { ChangeEvent, useState } from "react";
import { nanoid } from "nanoid";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface NodeType {
  id: string;
  label: string;
  content: string;
  children: NodeType[];
}

export default function NestedToggles() {
  const [nodes, setNodes] = useState<NodeType[]>([
    {
      id: "1",
      label: "Node 1",
      content: "Content",
      children: [],
    },
    {
      id: "5",
      label: "Node 2",
      content: "Content",
      children: [],
    },
  ]);

  const addNode = () => {
    const newNode = {
      id: nanoid(),
      label: `Parent Node `,
      content: "loreum ipsum dolor sit amet consectetur adipisicing elit.",
      children: [],
    };

    setNodes([...nodes, newNode]);
  };

  return (
    <section>
      <h2 className="title">Nested Toggles</h2>
      <div className="nested-toggles">
        <div>
          <button className="btn-secondary" onClick={addNode}>
            Add Node +
          </button>
        </div>
        <Tree nodes={nodes} setNodes={setNodes} />
      </div>
    </section>
  );
}

function Tree({
  nodes,
  setNodes,
}: {
  nodes: NodeType[];
  setNodes: (nodes: NodeType[]) => void;
}) {
  const [parent] = useAutoAnimate();

  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);
  const [editedNodeId, setEditedNodeId] = useState<string | null>(null);
  const [editedNodeIdC, setEditedNodeIdC] = useState<string | null>(null);

  const toggleNode = (nodeId: string) => {
    setExpandedNodes((prevNodes) =>
      prevNodes.includes(nodeId)
        ? prevNodes.filter((id) => id !== nodeId)
        : [...prevNodes, nodeId]
    );
  };

  const addChild = (parentNode: NodeType) => {
    const newChild = {
      id: nanoid(),
      label: `New Node`,
      content: "loreum ipsum dolor sit amet consectetur adipisicing elit.",
      children: [],
    };

    const updatedNodes = nodes.map((node) => {
      if (node.id === parentNode.id) {
        return {
          ...node,
          children: [...(node.children || []), newChild],
        };
      } else if (node.children) {
        return {
          ...node,
          children: node.children.map((child) =>
            child.id === parentNode.id
              ? { ...child, children: [...(child.children || []), newChild] }
              : child
          ),
        };
      } else {
        return node;
      }
    });

    setExpandedNodes((prevNodes) => [...prevNodes, parentNode.id]);
    setNodes(updatedNodes);
  };

  const handleNodeLabelChange = (
    event: ChangeEvent<HTMLInputElement>,
    editedNode: NodeType
  ) => {
    const updateNode = (node: NodeType): NodeType => {
      if (node.id === editedNode.id) {
        return {
          ...node,
          label: event.target.value,
        };
      } else if (node.children) {
        return {
          ...node,
          children: node.children.map((child: NodeType) => updateNode(child)),
        };
      } else {
        return node;
      }
    };

    const updatedNodes = nodes.map((node) => updateNode(node));

    setNodes(updatedNodes);
  };

  const handleNodeContentChange = (
    event: ChangeEvent<HTMLInputElement>,
    editedNode: NodeType
  ) => {
    const updateNode = (node: NodeType): NodeType => {
      if (node.id === editedNode.id) {
        return {
          ...node,
          content: event.target.value,
        };
      } else if (node.children) {
        return {
          ...node,
          children: node.children.map((child: NodeType) => updateNode(child)),
        };
      } else {
        return node;
      }
    };

    const updatedNodes = nodes.map((node) => updateNode(node));

    setNodes(updatedNodes);
  };

  const renderNode = (node: NodeType) => {
    const isExpanded = expandedNodes.includes(node.id);
    const isLabelEdited = editedNodeId === node.id;
    const isContentEdited = editedNodeIdC === node.id;

    if (isLabelEdited) {
      return (
        <li key={node.id}>
          <div
            className="toggle-title"
            onClick={(e) => e.detail === 3 && setEditedNodeId(node.id)}
          >
            <i
              className={
                isExpanded ? "fas fa-caret-down" : "fas fa-caret-right"
              }
              onClick={() => toggleNode(node.id)}
            />
            <input
              type="text"
              value={node.label}
              onChange={(event) => handleNodeLabelChange(event, node)}
              onBlur={() => setEditedNodeId(null)}
              autoFocus
            />
          </div>

          {node.children && isExpanded && (
            <ul>
              {node.children.map((child) => {
                return renderNode(child);
              })}
            </ul>
          )}
        </li>
      );
    } else if (isContentEdited) {
      return (
        <li key={node.id}>
          <div
            className="toggle-title"
            onClick={(e) => e.detail === 3 && setEditedNodeId(node.id)}
          >
            <i
              className={
                isExpanded ? "fas fa-caret-down" : "fas fa-caret-right"
              }
              onClick={() => toggleNode(node.id)}
            />

            {node.label}
          </div>
          {node.children && isExpanded && (
            <ul>
              <input
                type="text"
                value={node.content}
                onChange={(event) => handleNodeContentChange(event, node)}
                onBlur={() => setEditedNodeIdC(null)}
                autoFocus
              />
              {node.children.map((child) => {
                return renderNode(child);
              })}
            </ul>
          )}
        </li>
      );
    } else {
      return (
        <li ref={parent} key={node.id}>
          <div
            className="toggle-title"
            onClick={(e) => e.detail === 3 && setEditedNodeId(node.id)}
          >
            <i
              className={
                isExpanded ? "fas fa-caret-down" : "fas fa-caret-right"
              }
              onClick={() => toggleNode(node.id)}
            />

            {node.label}
          </div>
          {node.children && isExpanded && (
            <ul ref={parent} style={{ marginLeft: "3rem" }}>
              <p
                className="toggle-content"
                onClick={() => setEditedNodeIdC(node.id)}
              >
                {node.content}
              </p>

              {node.children.map((child) => {
                return renderNode(child);
              })}
              <li key={`${node.id}-add`}>
                <button onClick={() => addChild(node)}>+</button>
              </li>
            </ul>
          )}
        </li>
      );
    }
  };

  return (
    <ul ref={parent} className="nested-toggles-list">
      {nodes.map(renderNode)}
    </ul>
  );
}
