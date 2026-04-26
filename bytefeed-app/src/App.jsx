import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MainFeed from "./pages/MainFeed";
import PostDetail from "./pages/PostDetail";
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <div className="bg-surface text-on-surface min-h-screen">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/feed" element={<MainFeed />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/profile/:handle" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
