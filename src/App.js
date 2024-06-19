import { Routes, Route } from "react-router-dom";
import {
  Dashboard,
  Records,
  Knowledge,
  Debt,
  Budget,
  Statistic,
  GeneralSettings,
  Profile,
  Home,
  Auth,
  Support,
  CategorySettings,
  BalanceAccountSettings,
  Savings,
} from "./scenes";
import { Topbar, Sidebar } from "./components/global";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import ToBuyList from "./scenes/lists/ToBuyList";
import ToBuyItems from "./scenes/lists/ToBuyItems";

function App() {
  const [theme, colorMode, mode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar mode={mode} />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/records" element={<Records />} />
              <Route path="/knowledge" element={<Knowledge />} />
              <Route path="/lists/debt-list" element={<Debt />} />
              <Route path="/lists/to-buy-lists" element={<ToBuyList />} />
              <Route
                path="/lists/to-buy-lists/:listId"
                element={<ToBuyItems />}
              />
              <Route path="/budget" element={<Budget />} />
              <Route path="/statistics" element={<Statistic />} />
              <Route path="/settings/general" element={<GeneralSettings />} />
              <Route
                path="/settings/categories"
                element={<CategorySettings />}
              />
              <Route
                path="/settings/balance-accounts"
                element={<BalanceAccountSettings />}
              />
              <Route path="/profile" element={<Profile />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/support" element={<Support />} />
              <Route path="/home" element={<Home />} />
              <Route path="/savings" element={<Savings />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
