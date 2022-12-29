import React, { useState, useRef } from "react";
import App from "../App";
import { Link } from "react-router-dom";

export default () => {
  // * All Pages
  const [pageList, setPageList] = useState([
    { id: "1", title: "Page 1" },
    { id: "2", title: "Page 2" },
  ]);

  // * Create a new page
  const [createNewPage, setCreateNewPage] = useState(false);
  const [inputNewPage, setInputNewPage] = useState("");
  const createPageId = () => {
    return `#${self.crypto.randomUUID()}`;
  };
  const handleNewPageName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPageList([...pageList, { id: createPageId(), title: inputNewPage }]);
    setCreateNewPage(false);
    setInputNewPage("");
  };

  // * Edit a existing page
  const [editTitle, setEditTitle] = useState(false);
  const [inputEditTitle, setInputEditTitle] = useState({ id: "", title: "" });
  const handleEditPage = (id: string) => {
    const newPageList = pageList.map((page) => {
      if (page.id === id) {
        return { ...page, title: inputEditTitle.title };
      }
      return page;
    });
    setPageList(newPageList);
    setEditTitle(false);
    setInputEditTitle({ title: "", id: "" });
  };

  // make the input focus when the edit button is clicked
  const inputRef = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  return (
    <section className="container mx-auto max-w-xl p-4 m-4 bg-gray-200 rounded">
      <h2 className="text-2xl text-center">Create Pages</h2>

      {/* Page List */}
      {pageList.map((page) => (
        <div key={page.id} className="flex justify-start">
          <Link
            to={`/pages/${page.title.replace(/\s+/g, "-") + page.id}`}
            className="bg-transparent  text-gray-700  hover:text-gray-400 px-4 border  hover:border-transparent rounded my-2 w-full text-left"
            key={page.id}
          >
            <p>{page.title}</p>
          </Link>
          <button
            onClick={async () => {
              await setEditTitle(true);
              await setInputEditTitle({ title: page.title, id: page.id });
              editInputRef.current?.focus();
            }}
            className="bg-transparent  text-gray-700  hover:text-gray-500 "
          >
            <i className="fas fa-edit"></i>
          </button>
          {editTitle && inputEditTitle.id === page.id && (
            <form onSubmit={() => handleEditPage(page.id)}>
              <input
                ref={editInputRef}
                type="text"
                className="bg-transparent my-4 py-2 px-4 outline-none placeholder-focus placeholder:italic placeholder:text-md  "
                value={inputEditTitle.title}
                onChange={(e) =>
                  setInputEditTitle({
                    ...inputEditTitle,
                    title: e.target.value,
                  })
                }
              />
            </form>
          )}
        </div>
      ))}

      {/* Page Create */}
      {createNewPage && (
        <form onSubmit={handleNewPageName}>
          <input
            ref={inputRef}
            className="bg-transparent my-4 py-2 px-4 outline-none placeholder-focus placeholder:italic placeholder:text-md  "
            placeholder="New Page Name"
            type="text"
            value={inputNewPage}
            onChange={(e) => setInputNewPage(e.target.value)}
          />
        </form>
      )}
      <button
        onClick={async () => {
          await setCreateNewPage(true);
          inputRef.current?.focus();
        }}
        className="bg-transparent hover:bg-gray-500 text-gray-700 font-bold my-4 py-2 px-4 rounded
        border border-gray-500 hover:border-transparent"
      >
        Create New Page
      </button>
    </section>
  );
};
