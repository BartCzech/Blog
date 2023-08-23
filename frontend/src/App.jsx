import React from "react";
import { Link } from "react-router-dom";

import "./App.css"; // Import your custom CSS file

function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">Welcome to the Application!</h1>
      <div className="app-links">
        <Link to={`/api/posts/`} className="app-link">
          See All Posts
        </Link>

        <Link to={`/api/user/login`} className="app-link">
          Log In
        </Link>
      </div>
    </div>
  );
}

export default App;
