import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { Friends } from "./pages/Friends";
import Post from "./pages/Post";
import Login from "./pages/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import { AuthProvider } from "./components/AuthContext";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/post" element={<Post />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/friends" element={<Friends />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
