import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainFeed from "./pages/MainFeed";
import PostDetail from "./pages/PostDetail";
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuth } from "./AuthContext";

// Rota protegida: redireciona para / se não estiver autenticado
function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return user ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <Router>
      <div className="bg-surface text-on-surface min-h-screen">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/feed" element={<PrivateRoute><MainFeed /></PrivateRoute>} />
          <Route path="/post/:id" element={<PrivateRoute><PostDetail /></PrivateRoute>} />
          <Route path="/profile/:handle" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
