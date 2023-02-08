import { useState } from "react";
import Upload from "./components/Form/CreateEmployee";
import CreateEmployee from "./components/Form/CreateEmployee";
import "./App.css";
import Charts from "./pages/charts/Charts";
import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div>
      <header>
        <h1>Salary & Expenses</h1>
      </header>
      <Router>
        <Routes>
          <Route path="/" element={<CreateEmployee />} />
          <Route path="/charts" element={<Charts />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
