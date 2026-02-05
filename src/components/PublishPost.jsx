import { useState, useContext } from "react";
import { AuthContext } from "../context";
import "../App.css";

const PublishPost = ({ cancel }) => {
  const { state, dispatch } = useContext(AuthContext);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const token = localStorage.getItem("token");

  const updateText = (e) => setText(e.target.value);
  const updateTitle = (e) => setTitle(e.target.value);

  const getPosts = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      };

      const res = await fetch("/getPosts", options);
      const data = await res.json();
      if (data && data.posts) dispatch({ type: "set posts", payload: data.posts });
    } catch (err) {
      console.error("Failed to refresh posts:", err);
    }
  };

  const handleFileChange = (event) => {
    const f = event.target.files && event.target.files[0];
    if (f) setFile(f);
  };

  const publish = async () => {
    if (!title.trim() || !text.trim()) {
      alert("Title and content are required.");
      return;
    }

    if (!state || !state.user || !state.user.user_id) {
      alert("Please sign in before publishing.");
      return;
    }

    const formData = new FormData();
    formData.append("user_id", state.user.user_id);
    formData.append("content", text);
    formData.append("title", title);
    if (file) formData.append("media", file);

    try {
      const options = {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      };

      const response = await fetch("/addPost", options);
      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      await response.json();
      await getPosts();
      if (typeof cancel === "function") cancel();
      alert("Your post has been published.");
    } catch (error) {
      console.error("Publish failed:", error);
      alert("Failed to publish post. See console for details.");
    }
  };

  return (
    <div className="post-form">
      <textarea
        className="text-input"
        placeholder="Title"
        value={title}
        onChange={updateTitle}
        required
      />

      <textarea
        className="text-input"
        placeholder="Story Content"
        value={text}
        onChange={updateText}
        required
      />

      <input className="file-input" type="file" onChange={handleFileChange} />

      <div style={{ marginTop: 8 }}>
        <button className="btn btn-primary post-btn" onClick={publish}>
          Publish
        </button>
        <button className="btn btn-secondary post-btn" onClick={cancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PublishPost;
