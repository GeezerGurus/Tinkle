// App.js
import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import {
  Dashboard,
  Records,
  Knowledge,
  Debt,
  Budget,
  BudgetPeriod,
  Statistics,
  GeneralSettings,
  Profile,
  CategorySettings,
  BalanceAccountSettings,
  Goals,
  BudgetOverview,
  Books,
  Collection,
  DebtItems,
  Video,
  VideoCollection,
  PageNotFound,
  AboutUs,
} from "./scenes";
import { Topbar, Sidebar } from "./components/global";
import { Box, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import ToBuyList from "./scenes/lists/ToBuyList";
import ToBuyItems from "./scenes/lists/ToBuyItems";
import Hero from "./scenes/hero/Hero";
import { AuthContext } from "../src/context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);
  return auth.token ? children : <Navigate to="/" replace />;
  // return children;
};

function App() {
  const [theme, colorMode, mode] = useMode();
  const { login } = useContext(AuthContext);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      login(token);
    }
  }, [login]);

  const hideTopbarAndSidebarRoutes = ["/", "/page-not-found", "/about-us"]; // routes that hide Topbar and Sidebar

  const shouldShowTopbarAndSidebar = !hideTopbarAndSidebarRoutes.includes(
    location.pathname
  );

  // if (Math.random() < 0.5) {
  //   throw new Error("Testing react-error-boundary");
  // }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className="app">
          {isSmallScreen || !shouldShowTopbarAndSidebar ? (
            ""
          ) : (
            <Sidebar mode={mode} />
          )}
          <main className="content">
            {shouldShowTopbarAndSidebar && <Topbar />}
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
                path="/lists/debt-list/:debtItemId"
                element={
                  <PrivateRoute>
                    <DebtItems />
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
                    <Statistics />
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
              {/* <Route
                path="/support"
                element={
                  <PrivateRoute>
                    <Support />
                  </PrivateRoute>
                }
              /> */}
              <Route
                path="/about-us"
                element={
                  <PrivateRoute>
                    <AboutUs />
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
              <Route
                path="/videos"
                element={
                  <PrivateRoute>
                    <Video />
                  </PrivateRoute>
                }
              />
              <Route
                path="/videos/:videoCollection"
                element={
                  <PrivateRoute>
                    <VideoCollection />
                  </PrivateRoute>
                }
              />
              <Route path="/page-not-found" element={<PageNotFound />} />
              <Route path="*" element={<Navigate to="/page-not-found" />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
