import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import Verify from "./components/Verify";
import Common from "./components/common";
import Dash from "./components/dash";
import { useState } from "react";
function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route index element={<Home/>}/>
        <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dash" element={<Dash />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/common" element={<Common />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
