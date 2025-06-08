import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from 'react-hot-toast';
import "./index.css";
import App from "./App.tsx";
import Home from "./Home.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Home />
    <div id="APP" className="py-[10px] ">
      <App />
    </div>
     <Toaster />
  </StrictMode>
);
