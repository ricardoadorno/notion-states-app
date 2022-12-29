import React, { useState } from "react";
import ToDo from "./Todo";
import Toggles from "./Toggles";
import Markdown from "./Markdown";
import Emojis from "./Emojis";
import Pagination from "./Pagination";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Pages from "./Pagination/Pages";
import TextBlocks from "./TextBlocks";
import Table from "./Table";

// TODO crete table block

function App() {
  return (
    <Router>
      <nav className="bg-gray-800 p-6">
        <div className=" grid grid-cols-3 ">
          <Link
            to="/"
            className="text-white self-center col-start-1 text-center "
          >
            <i className="fas fa-home text-3xl"></i>
          </Link>
          <h1 className="text-4xl text-white  col-start-2  text-center">
            Notion States App
          </h1>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pages/:id" element={<Pages />} />
      </Routes>
    </Router>
  );
}

function Home() {
  return (
    <>
      <Toggles />
      <TextBlocks />
      <Table />
      <ToDo />
      <Pagination />
      <Markdown />
      <Emojis />
    </>
  );
}

export default App;
