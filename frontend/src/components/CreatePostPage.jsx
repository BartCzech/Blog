import React, { useState } from "react";
import "./CreatePostPage.css"; // Import your custom CSS file for styling

function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      setErrorMessage("Who are you to write anything on my blog?");
      return;
    }

    const postData = {
      title: title,
      text: text,
    };

    try {
      const response = await fetch("http://127.0.0.1:3000/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        // Clear fields and show success message
        setTitle("");
        setText("");
        setSuccessMessage("Post submitted successfully!");
        setErrorMessage("");
      } else {
        console.error("Post creation failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="create-post-container">
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label>Title:</label>
          <input
            className="input"
            type="text"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Text:</label>
          <textarea
            className="input"
            value={text}
            onChange={handleTextChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Create Post
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default CreatePostPage;
