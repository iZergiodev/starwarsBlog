import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { Navbar } from './Navbar';
import { Details } from "./Details.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route path="/" element={<App />} />
      <Route path="/:type/:id" element={<Details />} />
      <Route path="*" element={<h1>ERROR 404</h1>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
