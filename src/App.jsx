import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

// Protected Route wrapper
function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  
  if (!token) {
    return <Navigate to="/signin" replace />;
  }
  
  return children;
}

// Public Route wrapper
function RequireNoAuth({ children }) {
  const token = localStorage.getItem("token");
  
  if (token) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/signin"
          element={
            <RequireNoAuth>
              <Signin />
            </RequireNoAuth>
          }
        />
        
        <Route
          path="/signup"
          element={
            <RequireNoAuth>
              <Signup />
            </RequireNoAuth>
          }
        />
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;