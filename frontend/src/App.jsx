import "./App.css";
import AllPostsPage from "./components/AllPostsPage";
import { Link } from "react-router-dom";

function App() {
  return (
    <Link to={`/api/posts/`}>
      <div>All posts</div>
    </Link>
  );
}

export default App;
