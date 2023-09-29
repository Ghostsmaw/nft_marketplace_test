import React from "react";
import logo from "./logo.svg";
import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Products from "./pages/products";
import Details from "./pages/details";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/assets/:contract/:token_id" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;
