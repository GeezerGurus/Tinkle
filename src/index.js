import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { SnackbarProvider } from "notistack";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./scenes/errors/ErrorPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <AuthProvider>
        <BrowserRouter>
          <SnackbarProvider maxSnack={3}>
            <App />
          </SnackbarProvider>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
