import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App";
import DrawingRoom from "./DrawingRoom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/drawing-room" element={<DrawingRoom />} />
        <Route path="/lineage" element={<div className="p-10">Our Lineage – coming soon</div>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);