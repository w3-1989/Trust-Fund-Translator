import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App";
import DrawingRoom from "./DrawingRoom";
import Lineage from "./Lineage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/drawing-room" element={<DrawingRoom />} />
        <Route path="/Lineage" element={<Lineage/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);