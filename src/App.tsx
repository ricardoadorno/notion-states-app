import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Page from "./pages/Page";

function App() {
  return (
    <Router>
      <nav>
        <h1>Notion States</h1>
      </nav>
      <article className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pages/:id" element={<Page />} />
        </Routes>
      </article>
    </Router>
  );
}

export default App;
