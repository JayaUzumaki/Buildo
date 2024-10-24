// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PocketProvider } from "./context/PocketContext";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      {" "}
      {/* Wrap App in Router */}
      <PocketProvider>
        <App />
      </PocketProvider>
    </Router>
  </React.StrictMode>
);
  