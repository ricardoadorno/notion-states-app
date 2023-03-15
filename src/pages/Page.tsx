import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MarkdownBlock from "../components/MarkdownBlock";

function Page() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [content, setContent] = useState(null);

  return (
    <div>
      <i
        onClick={() => {
          navigate("/");
        }}
        className="fas fa-arrow-left"
      ></i>
      <h1 className="text-4xl text-white font-bold text-center m-8">
        {id && id.replace(/-/g, " ")}
      </h1>
      <div className="container mx-auto max-w-xl p-4 m-4 bg-gray-200 rounded">
        <p className="text-2xl  font-bold text-center m-8">Welcome!</p>
        <p className="text-sm  font-bold text-center m-8 italic">
          You can go back using the house icon on the top
        </p>
      </div>

      <h3>Create Mardown Block</h3>
      <button
        onClick={() => {
          setContent((prev) => {
            return (
              <>
                {prev}
                <MarkdownBlock />
              </>
            );
          });
        }}
      >
        New
      </button>
      {content}
    </div>
  );
}

export default Page;
