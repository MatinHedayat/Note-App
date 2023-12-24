import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./css/tailwind.css";
import { BrowserRouter } from "react-router-dom";
import NotesProvider from "./contexts/NotesProvider.jsx";
import UserProvider from "./contexts/UserProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <NotesProvider>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </NotesProvider>
);
