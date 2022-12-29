import { useState } from "react";

export default function CalloutBlock() {
  const [calloutType, setCalloutType] = useState("danger");

  return (
    <div
      className={`p-4 rounded m-4
    ${calloutType === "info" ? "bg-gray-400 " : "bg-red-400"}
    `}
    >
      <div className="flex items-center">
        <i className="fas fa-info-circle text-gray-800 text-lg"></i>
        <p className="pl-4 font-bold text-lg">
          {" "}
          Callout Block Lorem ipsum dolor sit amet.
        </p>
      </div>
    </div>
  );
}
