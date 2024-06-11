import { Routes, Route } from "react-router-dom";
import {
  Dashboard,
  Records,
  Knowledge,
  Lists,
  Budget,
  Statistic,
  Settings,
  Profile,
  Home,
  Auth,
  Support,
} from "./scenes";
import { Topbar, Sidebar } from "./components";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

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
              <Route path="/lists" element={<Lists />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/statistics" element={<Statistic />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/support" element={<Support />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
