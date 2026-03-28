import { useUser } from "@clerk/clerk-react";
import { Navigate, Route, Routes, useLocation } from "react-router";

import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import ProblemPage from "./pages/ProblemPage";
import ProblemsPage from "./pages/ProblemsPage";
import QuizPage from "./pages/QuizPage";
import SessionPage from "./pages/SessionPage";
import AboutPage from "./pages/AboutPage";

import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

function App() {
  const { isSignedIn, isLoaded } = useUser();
  const location = useLocation();

  const hideFooterRoutes = [
     "/",
    "/editor",
    "/session",
    "/problems",
    "/problem"
  ];

  const shouldHideFooter = hideFooterRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  if (!isLoaded) return null;

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={!isSignedIn ? <HomePage /> : <Navigate to="/dashboard" />}
        />

        <Route
          path="/dashboard"
          element={isSignedIn ? <DashboardPage /> : <Navigate to="/" />}
        />

        <Route
          path="/quiz"
          element={isSignedIn ? <QuizPage /> : <Navigate to="/" />}
        />

        <Route
          path="/problems"
          element={isSignedIn ? <ProblemsPage /> : <Navigate to="/" />}
        />

        <Route
          path="/problem/:id"
          element={isSignedIn ? <ProblemPage /> : <Navigate to="/" />}
        />

        <Route
          path="/session/:id"
          element={isSignedIn ? <SessionPage /> : <Navigate to="/" />}
        />

        {/* ✅ FIXED: About route inside Routes */}
        <Route path="/about" element={<AboutPage />} />
      </Routes>

      {/* Footer */}
      {!shouldHideFooter && <Footer />}

      <Toaster toastOptions={{ duration: 3000 }} />
    </>
  );
}

export default App;