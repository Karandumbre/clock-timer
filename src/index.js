import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Solution } from "./solution";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="App">
      <Solution />
    </div>
  </React.StrictMode>
);
