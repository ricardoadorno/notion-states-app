import { useState } from "react";
import "./Editable.scss";
import { nanoid } from "nanoid";

// TODO
// - [ ] Make the select input
// - [ ] Make the "/" command change the current

// - [ ] Make the "Enter" create right under the current block
// - [ ] Make the "Enter" Create a paragraph block - if is a list, continue the list

// - [ ] Add A button to add change the block type
// - [ ] Make the blocks sortable

type BlockType = {
  id: string;
  type: string;
  icon: string;
  defaultText: string;
};

const blockTypesList = [
  {
    type: "paragraph",
    icon: "P",
    defaultText: "Write something here...",
  },
  {
    type: "heading_one",
    icon: "H1",
    defaultText: "Heading 1",
  },
  {
    type: "heading_two",
    icon: "H2",
    defaultText: "Heading 2",
  },
];

function EditableBlock({
  handleNewBlock,
  blockType,
}: {
  handleNewBlock: any;
  blockType: BlockType;
}) {
  return (
    <div
      contentEditable="true"
      spellCheck="true"
      data-text={blockType.defaultText}
      data-content-editable-leaf="true"
      onKeyDown={handleNewBlock}
      className={`block block_type--${blockType.type}`}
    ></div>
  );
}

export default function Editable() {
  const [allBlocks, setAllBlocks] = useState<BlockType[]>([
    {
      id: nanoid(),
      type: "paragraph",
      icon: "P",
      defaultText: "Write something here...",
    },
  ]);

  const [isChoosingBlockType, setIsChoosingBlockType] = useState(false);

  function handleNewBlock(e: any, type: string) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCreateBlockByType(type);
    }
    if (e.key === "/") {
      setIsChoosingBlockType(true);
    }
  }

  function handleCreateBlockByType(type: string) {
    const newBlock: any = {
      id: nanoid(),
      ...blockTypesList.find((block) => block.type === type),
    };

    setAllBlocks([...allBlocks, newBlock]);
    setIsChoosingBlockType(false);
  }

  return (
    <section>
      <h2>Editable</h2>

      {allBlocks.map((block) => {
        return (
          <EditableBlock
            key={block.id}
            handleNewBlock={(e: any) => handleNewBlock(e, block.type)}
            blockType={block}
          />
        );
      })}

      {isChoosingBlockType && (
        <div className="block-type-chooser">
          {blockTypesList.map((blockType) => (
            <div key={blockType.type}>
              <button onClick={() => handleCreateBlockByType(blockType.type)}>
                {blockType.icon}
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
