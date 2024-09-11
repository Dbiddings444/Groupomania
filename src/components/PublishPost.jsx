import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context";
import "../App.css";

const PublishPost = ({ cancel }) => {
  const { state, dispatch } = useContext(AuthContext);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  const updateText = (event) => {
    setText(event.target.value);
  };
  const updateTitle = (event) => {
    setTitle(event.target.value);
  };

  const getPosts = async () => {
    let obj = {};

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    };

    await fetch("/getPosts", options)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "set posts", payload: data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFileChange = (event) => {
    console.log(state.user.email);
    setContent(event.target.files[0].name);
    setFile(event.target.files[0]);
  };

  const publish = async () => {
    const formData = new FormData();
	  if (!title || !text) {
    alert("Title and content are required!"); // Notify the user that input is missing
    return; // Stop execution if validation fails
	  }
    formData.append("user_id", state.user.user_id); // Add user_id
    formData.append("content", text); // Add the post content
	formData.append("title", title)
    // Add the file only if one is selected
    if (file) {
      formData.append("media", file); // Append the actual file
    }

    const options = {
      method: "POST",
      body: formData,
    };

    try {
      const response = await fetch("/addPost", options);

      // Check if the response is not OK (e.g., status code 404 or 500)
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json(); // Parse JSON response
      getPosts(); // Refresh the posts
	  cancel(); // Close the input form after successful submissio
	  alert("Your post has successfully been published")
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="post-form">
		  <textarea
        className="text-input"
		placeholder="Title"
        onChange={(e) => updateTitle(e)}
		required
      ></textarea>
      <textarea
        className="text-input"
		placeholder="Story Content"
        onChange={(e) => updateText(e)}
		required
      ></textarea>
      <input
        className="file-input"
        type="file"
        onChange={(e) => {
          handleFileChange(e);
        }}
      />
      <button className="btn btn-primary post-btn" onClick={() => publish()}>
        Publish
      </button>
      <button className="btn btn-secondary post-btn" onClick={() => cancel()}>
        Cancel
      </button>
    </div>
  );
};

export default PublishPost;
