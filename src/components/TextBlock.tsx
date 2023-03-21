import { useState } from "react";
import Picker from "@emoji-mart/react";

export default function TextBlock() {
  const [blockState, setBlockState] = useState({
    text: "You can edit this block, try it out!",
    isEdit: false,
    type: "success",
  });

  function currentType() {
    switch (blockState.type) {
      case "success":
        return "#008080";
      case "info":
        return "#4c1d95";
      case "danger":
        return "#c53030";
      default:
        return "green";
    }
  }

  // Call Emonji Picker
  const data = async () => {
    const response = await fetch(
      "https://cdn.jsdelivr.net/npm/@emoji-mart/data"
    );

    return response.json();
  };
  const [emojiEdit, setEmojiEdit] = useState({
    isEdit: false,
    emoji: "😁",
  });

  return (
    <section>
      <h2>Text Block</h2>
      <div
        className="block-container"
        style={{ backgroundColor: `${currentType()}` }}
      >
        {emojiEdit.isEdit && (
          <div className="emoji-picker">
            <Picker
              data={data}
              onEmojiSelect={(emoji: any) =>
                setEmojiEdit({ isEdit: false, emoji: emoji.native })
              }
              categories={["people", "nature", "food", "activity", "travel"]}
              previewPosition={"none"}
              searchPosition={"none"}
              showPreview={false}
            />
          </div>
        )}
        <div
          className="emoji"
          onClick={() => setEmojiEdit({ ...emojiEdit, isEdit: true })}
        >
          {emojiEdit.emoji}
        </div>

        {blockState.isEdit ? (
          <form
            className="block-form"
            onSubmit={(e) => {
              e.preventDefault();
              setBlockState({ ...blockState, isEdit: false });
            }}
          >
            <input
              value={blockState.text}
              onChange={(e) =>
                setBlockState({ ...blockState, text: e.target.value })
              }
              onBlur={(e) => {
                setBlockState({ ...blockState, isEdit: false });
              }}
            />
          </form>
        ) : (
          <p
            className="block-text"
            onClick={(e) => {
              e.detail === 2 && setBlockState({ ...blockState, isEdit: true });
            }}
          >
            {blockState.text}
          </p>
        )}

        <select
          className="block-select"
          onChange={(e) =>
            setBlockState({ ...blockState, type: e.target.value })
          }
        >
          <option value="success">Success</option>
          <option value="info">Info</option>
          <option value="danger">Danger</option>
        </select>
      </div>
    </section>
  );
}
