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
      <h1>{id && id.replace(/-/g, " ")}</h1>
      <p>You can go back using the house icon on the top</p>

      <h3>Create Mardown Block</h3>
      {content}
    </div>
  );
}

export default Page;
