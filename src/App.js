import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  Dashboard,
  Records,
  Knowledge,
  Debt,
  Budget,
  BudgetPeriod,
  Statistic,
  GeneralSettings,
  Profile,
  Home,
  Auth,
  Support,
  CategorySettings,
  BalanceAccountSettings,
  Goals,
  BudgetOverview,
  Books,
  Collection,
} from "./scenes";
import { Topbar, Sidebar } from "./components/global";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import ToBuyList from "./scenes/lists/ToBuyList";
import ToBuyItems from "./scenes/lists/ToBuyItems";
import Hero from "./scenes/hero/Hero";
import { AuthContext } from "../src/context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // return user ? children : <Navigate to="/" replace />;
  return children;
};

function App() {
  const [theme, colorMode, mode] = useMode();
  const { login } = useContext(AuthContext);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      login(token);
    }
  }, [login]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className="app">
          {isSmallScreen ? ("") : (<Sidebar mode={mode} />)}

          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/records"
                element={
                  <PrivateRoute>
                    <Records />
                  </PrivateRoute>
                }
              />
              <Route
                path="/knowledge"
                element={
                  <PrivateRoute>
                    <Knowledge />
                  </PrivateRoute>
                }
              />
              <Route
                path="/lists/debt-list"
                element={
                  <PrivateRoute>
                    <Debt />
                  </PrivateRoute>
                }
              />
              <Route
                path="/lists/to-buy-lists"
                element={
                  <PrivateRoute>
                    <ToBuyList />
                  </PrivateRoute>
                }
              />
              <Route
                path="/lists/to-buy-lists/:listId"
                element={
                  <PrivateRoute>
                    <ToBuyItems />
                  </PrivateRoute>
                }
              />
              <Route
                path="/budget"
                element={
                  <PrivateRoute>
                    <Budget />
                  </PrivateRoute>
                }
              />
              <Route
                path="/budget/:periodType"
                element={
                  <PrivateRoute>
                    <BudgetPeriod />
                  </PrivateRoute>
                }
              />
              <Route
                path="/budget/:periodType/:budgetId"
                element={
                  <PrivateRoute>
                    <BudgetOverview />
                  </PrivateRoute>
                }
              />
              <Route
                path="/statistics"
                element={
                  <PrivateRoute>
                    <Statistic />
                  </PrivateRoute>
                }
              />
              <Route
                path="/settings/general"
                element={
                  <PrivateRoute>
                    <GeneralSettings />
                  </PrivateRoute>
                }
              />
              <Route
                path="/settings/categories"
                element={
                  <PrivateRoute>
                    <CategorySettings />
                  </PrivateRoute>
                }
              />
              <Route
                path="/settings/balance-accounts"
                element={
                  <PrivateRoute>
                    <BalanceAccountSettings />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/support"
                element={
                  <PrivateRoute>
                    <Support />
                  </PrivateRoute>
                }
              />
              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/goals"
                element={
                  <PrivateRoute>
                    <Goals />
                  </PrivateRoute>
                }
              />
              <Route
                path="/books"
                element={
                  <PrivateRoute>
                    <Books />
                  </PrivateRoute>
                }
              />
              <Route
                path="/books/:collection"
                element={
                  <PrivateRoute>
                    <Collection />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
