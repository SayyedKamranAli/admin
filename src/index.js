import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="662882730675-8msp4dq27mj79471mvs3vceg5vbo5r8c.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
