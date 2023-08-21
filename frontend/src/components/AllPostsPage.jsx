import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios'

function AllPostsPage() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const { data } = await axios.get("http://127.0.0.1:3000/api/posts");
    console.log(data);
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="card">
      {posts.map((post) => (
        <Link to={`/api/posts/${post._id}`} key={post._id}>
          <div>{post.title}</div>
        </Link>
      ))}
    </div>
  );
}

export default AllPostsPage;
