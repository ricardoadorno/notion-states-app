import { useState } from "react";
import Picker from "@emoji-mart/react";

export default () => {
  const [input, setInput] = useState("");

  const data = async () => {
    const response = await fetch(
      "https://cdn.jsdelivr.net/npm/@emoji-mart/data"
    );

    return response.json();
  };

  return (
    <section className="mx-auto max-w-xl p-4 m-4 bg-gray-200 rounded">
      <h2 className="text-2xl text-center m-4 p-2">Emojis</h2>
      <div className="flex flex-col justify-center items-center">
        <Picker
          data={data}
          onEmojiSelect={(emoji: any) => setInput(input + emoji.native)}
          categories={["people", "nature", "food", "activity", "travel"]}
          previewPosition={"none"}
          searchPosition={"none"}
          showPreview={false}
        />
        <p className="text-2xl text-start m-4">Add a Emote 😄</p>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-1/2 p-2 m-2 border rounded border-gray-300 bg-gray-500"
        />
      </div>
    </section>
  );
};
