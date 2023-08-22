import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import AllPostsPage from "./components/AllPostsPage.jsx";
import SinglePostPage from "./components/SinglePostPage.jsx";
import CreatePostPage from "./components/CreatePostPage.jsx";
import LoginPage from './components/LoginPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/api/user/login",
    element: <LoginPage />,
  },
  {
    path: "/api/posts",
    element: <AllPostsPage />,
  },
  {
    path: "/api/posts/create",
    element: <CreatePostPage />,
  },
  {
    path: "/api/posts/:postId",
    element: <SinglePostPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
