import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Friends } from "./pages/Friends";
import Post from "./pages/Post";
import Login from "./pages/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import { AuthProvider } from "./components/AuthContext";
import CreateUser from "./pages/CreateUser";
import ThreadWrapper from "./components/ThreadWrapper";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<CreateUser />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/friends"
            element={
              <PrivateRoute>
                <Friends />
              </PrivateRoute>
            }
          />
          <Route
            path="/post"
            element={
              <PrivateRoute>
                <Post />
              </PrivateRoute>
            }
          />
          <Route path="/messages/:id" element={<ThreadWrapper />}></Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
