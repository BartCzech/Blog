import "./App.css";
import AllPostsPage from "./components/AllPostsPage";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <div>Welcome to the application!</div>
      <Link to={`/api/posts/`}>
        <div>See all posts</div>
      </Link>

      <Link to={`/api/user/login`}>
        <div>Log in</div>
      </Link>
    </>
  );
}

export default App;
