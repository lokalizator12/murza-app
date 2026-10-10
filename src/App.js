import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Home from "./pages/home/home";
import Success from "./pages/Success";
import About from "./pages/about/about";
import "./style.css";
import "./styles/murza.css";
import Legal from "./pages/legal/legal";
import NotFound from "./pages/not-found/not-found";
import "mapbox-gl/dist/mapbox-gl.css";
import { AuthProvider } from "./context/AuthContext";
import Navbar8 from "./components/navbar8";
import AppErrorBoundary from "./components/AppErrorBoundary";
import PrivateRoute from "./services/PrivateRoute";
import Activate from "./pages/register/Activate";
const SignUp = React.lazy(() => import("./pages/register/sign-up"));
const SignIn1 = React.lazy(() => import("./pages/login/SignIn1"));
const MainPage = React.lazy(() => import("./pages/main/MainPage"));
const ProfilePage = React.lazy(() => import("./pages/profile/ProfilePage"));
const ChatPage = React.lazy(() => import("./components/chat/ChatPage"));
const ResetPassword = React.lazy(() => import("./pages/login/ResetPassword"));

function AppContent() {
  const location = useLocation(); // Получаем текущий путь

  // Путь, на котором навбар не должен отображаться
  const hideNavbarOnRoutes = ["/login", "/register"];
  const shouldHideNavbar = hideNavbarOnRoutes.some((path) =>
    location.pathname.startsWith(path),
  );

  return (
    <>
      {!shouldHideNavbar && <Navbar8 />}
      <AppErrorBoundary resetKey={location.pathname + location.search}>
        <Suspense
          fallback={
            <div className="murza-route-loading" role="status">
              Murza is getting things ready…
            </div>
          }
        >
          <Routes>
            <Route path="" element={<Home />} />
            <Route
              path="/main"
              element={
                <PrivateRoute>
                  <MainPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/request"
              element={<Navigate to="/main?create=parcel" replace />}
            />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<SignIn1 />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/success" element={<Success />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/chat/:userId"
              element={
                <PrivateRoute>
                  <ChatPage />
                </PrivateRoute>
              }
            />
            <Route path="/legal" element={<Legal />} />

            <Route
              path="/profile/:userId"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/inbox"
              element={
                <PrivateRoute>
                  <ChatPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
            <Route path="/activate" element={<Activate />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </Suspense>
      </AppErrorBoundary>
    </>
  );
}

function App() {
  const theme = createTheme({
    palette: {
      primary: { main: "#245a81" },
      secondary: { main: "#36715c" },
      text: { primary: "#25313b", secondary: "#64727c" },
    },
    typography: {
      fontFamily: "Asap, Arial, sans-serif",
      button: { textTransform: "none", fontWeight: 600 },
    },
    shape: { borderRadius: 6 },
    components: {
      MuiButton: { defaultProps: { disableElevation: true } },
      MuiAccordion: { styleOverrides: { root: { boxShadow: "none" } } },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
