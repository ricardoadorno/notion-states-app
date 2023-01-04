import React from "react";
import { useParams } from "react-router-dom";

function Pages() {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1 className="text-4xl text-white font-bold text-center m-8">
        {id && id.replace(/-/g, " ")}
      </h1>
      <div className="container mx-auto max-w-xl p-4 m-4 bg-gray-200 rounded">
        <p className="text-2xl  font-bold text-center m-8">Welcome!</p>
        <p className="text-sm  font-bold text-center m-8 italic">
          You can go back using the house icon on the top
        </p>
      </div>
    </div>
  );
}

export default Pages;
