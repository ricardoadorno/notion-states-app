import React, { useState, useRef } from "react";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";

export default function Pagination() {
  // make the input focus when the edit button is clicked
  const inputRef = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  // * All Pages
  const [pageList, setPageList] = useState([
    { id: nanoid(), title: "Create New Pages!" },
  ]);

  // * Create a new page
  const [createNewPage, setCreateNewPage] = useState(false);
  const [inputNewPage, setInputNewPage] = useState("");

  const handleNewPageName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputNewPage) {
      setPageList([...pageList, { id: nanoid(), title: inputNewPage }]);
    }
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

  return (
    <section>
      <h2>Pagination</h2>

      <div className="pagination">
        {pageList.map((page) => (
          <div key={page.id}>
            <div className="page-list">
              <Link
                to={`/pages/${page.title.replace(/\s+/g, "-") + page.id}`}
                key={page.id}
              >
                <p>{page.title}</p>
              </Link>
              <a
                className="edit-btn"
                onClick={async () => {
                  setEditTitle(true);
                  await setInputEditTitle({ title: page.title, id: page.id });
                  editInputRef.current?.focus();
                }}
              >
                <i className="fas fa-edit"></i>
              </a>
            </div>
            {editTitle && inputEditTitle.id === page.id && (
              <div className="pagination-new-page">
                <form
                  className="edit-form"
                  onSubmit={() => handleEditPage(page.id)}
                >
                  <input
                    ref={editInputRef}
                    type="text"
                    value={inputEditTitle.title}
                    onChange={(e) =>
                      setInputEditTitle({
                        ...inputEditTitle,
                        title: e.target.value,
                      })
                    }
                    onBlur={() => handleEditPage(page.id)}
                  />
                  <button className="btn-secundary" type="submit">
                    Edit
                  </button>
                </form>
              </div>
            )}
          </div>
        ))}

        <div className="pagination-new-page">
          <button
            onClick={async () => {
              await setCreateNewPage(true);
              inputRef.current?.focus();
            }}
          >
            Create New Page
          </button>
          {/* Page Create */}
          {createNewPage && (
            <form onSubmit={handleNewPageName}>
              <input
                ref={inputRef}
                placeholder="New Page Name"
                type="text"
                value={inputNewPage}
                onChange={(e) => setInputNewPage(e.target.value)}
              />
              <button className="btn-secundary" type="submit">
                Create
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
