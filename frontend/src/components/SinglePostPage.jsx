import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function SinglePostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [comments, setComments] = useState();

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:3000/api/posts/${postId}`
      );
      setPost(data.post);
      setComments(data.comments);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card">
      <div>{post.title}</div>
      <div>{post.text}</div>
      <div>{post.timestamp}</div>

      <div>COMMENTS</div>

      {comments.map((comment) => (
        <div key={comment._id}>{comment.text}</div>
      ))}
    </div>
  );
}

export default SinglePostPage;
