import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MainRoutes from "./routes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SnackbarProvider
      autoHideDuration={10000}
      preventDuplicate={true}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <MainRoutes />
    </SnackbarProvider>
  </React.StrictMode>
);
