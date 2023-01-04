import { useState, useEffect } from "react";

export default function QuoteBlock() {
  const [quote, setQuote] = useState(
    "There is nothing impossible to they who will try."
  );
  const [author, setAuthor] = useState("Alexander the Great");

  const [quoteEdit, setQuoteEdit] = useState(false);
  const [authorEdit, setAuthorEdit] = useState(false);

  return (
    <div className=" border-l-8 bg-slate-300  border-gray-800 p-4 ml-4 my-4">
      <p className="text-gray-700 italic">"{quote}"</p>

      <p className="pl-4 pt-4">{author}</p>
    </div>
  );
}
