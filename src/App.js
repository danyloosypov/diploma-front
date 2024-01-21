import React, { useRef, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import Competition from "./pages/Competition";
import NotFound from "./pages/NotFound";

function App() {

    return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/competition" element={<Competition />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
