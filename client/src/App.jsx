import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AddEmployee from "./components/AddEmployee";
import UpdateEmployee from "./components/updateEmployee";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/update-employee/:id" element={<UpdateEmployee />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
