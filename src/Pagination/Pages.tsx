import React from "react";
import { useParams } from "react-router-dom";

function Pages() {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1 className="text-2xl text-center">
        {id && id.split("#").slice(0, 1).join("")}
      </h1>
    </div>
  );
}

export default Pages;
