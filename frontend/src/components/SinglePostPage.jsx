import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./SinglePostPage.css";

function SinglePostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ author_anon: "", text: "" });

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`http://127.0.0.1:3000/api/posts/${postId}`);
      console.log(data);
      setPost(data.post);
      setComments(data.comments);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://127.0.0.1:3000/api/posts/${postId}`, newComment);
      setComments([...comments, response.data]);
      setNewComment({ author_anon: "", text: "" });
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const formattedDate = new Date(post.timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="post-card">
      <h1 className="post-title">{post.title}</h1>
      <p className="post-text">{post.text}</p>
      <p className="post-info">Posted on: {formattedDate}</p>
      <p className="post-info">Written by: {post.author.email}</p>

      <div className="comments-header">COMMENTS</div>

      {comments.map((comment) => (
        <div key={comment._id} className="comment">
          <p className="comment-text">{comment.text}</p>
          <p className="comment-author">Comment by: {comment.author_anon}</p>
        </div>
      ))}

      <form className="comment-form" onSubmit={handleCommentSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={newComment.author_anon}
          onChange={(e) => setNewComment({ ...newComment, author_anon: e.target.value })}
        />
        <textarea
          placeholder="Your comment"
          value={newComment.text}
          onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
        />
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
}

export default SinglePostPage;
