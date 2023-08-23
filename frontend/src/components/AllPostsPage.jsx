import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import './AllPostsPage.css'; // Import your custom CSS file

function AllPostsPage() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:3000/api/posts");
      console.log(data);
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="post-list">
      <h1>Click on a post title to read it!</h1>
      {posts.map((post) => (
        <Link to={`/api/posts/${post._id}`} key={post._id} className="post-link">
          <div className="post-title">{post.title}</div>
        </Link>
      ))}
    </div>
  );
}

export default AllPostsPage;
