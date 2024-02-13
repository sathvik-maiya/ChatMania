import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import io from "socket.io-client";
import Home from "./pages/home";


const socket = io.connect("http://localhost:4000");

function App() {
  const [username, setUsername] = useState("");

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                username={username}
                setUsername={setUsername}
                socket={socket}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
