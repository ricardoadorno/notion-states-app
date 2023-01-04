import { useState } from "react";
import Picker from "@emoji-mart/react";

export default function CalloutBlock() {
  const [calloutState, setCalloutState] = useState({
    text: "You can edit this block, try it out!",
    isEdit: false,
    type: "success",
  });

  const handleType = (calloutType: string) => {
    switch (calloutType) {
      case "danger":
        return "bg-red-400";
      case "info":
        return "bg-blue-400";
      case "success":
        return "bg-green-400";
      case "warning":
        return "bg-yellow-300";
      default:
        return "bg-gray-400";
    }
  };

  // * Call Emonji Picker
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
    <div className={`p-4 rounded m-4 ${handleType(calloutState.type)}`}>
      <div className="relative flex items-center p-6">
        {/* Select Emoji */}
        {emojiEdit.isEdit && (
          <div className="absolute top-0 left-0 z-50 p-4 ">
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
          className="cursor-pointer text-lg pr-4"
          onClick={() => setEmojiEdit({ ...emojiEdit, isEdit: true })}
        >
          {emojiEdit.emoji}
        </div>

        {/* Select text */}
        {calloutState.isEdit ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setCalloutState({ ...calloutState, isEdit: false });
            }}
            className="w-full 
              "
          >
            <textarea
              className="w-full bg-transparent text-lg  
              outline-none  resize-none 
              "
              value={calloutState.text}
              onChange={(e) =>
                setCalloutState({ ...calloutState, text: e.target.value })
              }
            />
            <button
              type="submit"
              className="p-1  hover:bg-gray-200 hover:bg-opacity-30"
            >
              <i className="fas fa-check p-2"></i>
              Confirm Edit
            </button>
          </form>
        ) : (
          <p
            className="font-bold text-lg"
            onClick={() => setCalloutState({ ...calloutState, isEdit: true })}
          >
            {calloutState.text}
          </p>
        )}

        {/* Select Type */}
        <select
          className="absolute right-0 top-0 text-sm bg-transparent hover:bg-gray-200 hover:bg-opacity-30 rounded p-1 focus:outline-none"
          onChange={(e) =>
            setCalloutState({ ...calloutState, type: e.target.value })
          }
        >
          <option value="success">Success</option>
          <option value="info">Info</option>
          <option value="warning">Warning</option>
          <option value="danger">Danger</option>
        </select>
      </div>
    </div>
  );
}
