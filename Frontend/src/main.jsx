import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import PromptToResume from "./pages/prompt-to-resume/PromptToResume.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PromptToResume />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
