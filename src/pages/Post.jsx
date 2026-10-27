import { useState } from "react";
import "./Post.css";

function Post() {
  const [postType, setPostType] = useState("Question");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [abstract, setAbstract] = useState("");
  const [articleText, setArticleText] = useState("");
  const [tags, setTags] = useState("");


  function handlePost(event) {
    event.preventDefault();
    if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }
    if (postType === "Question" && !description.trim()) {
      alert("Please describe your problem.");
      return;
    }
    if (postType === "Article" &&
        (!abstract.trim() || !articleText.trim())) {
      alert("Please complete the abstract and article text.");
      return;
    }
    const tagList = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    if (tagList.length === 0 || tagList.length > 3) {
      alert("Please enter between 1 and 3 tags.");
      return;
    }

    alert("Your post has been submitted successfully!");
  }

  return (
    <div className="post-container">
      <h1>New Post</h1>

      <div className="post-type">
        <label>
          <input
            type="radio"
            name="postType"
            value="Question"
            checked={postType === "Question"} onChange={() => setPostType("Question")}
          />
          Question
        </label>

        <label>
          <input
            type="radio"
            name="postType"
            value="Article"
            checked={postType === "Article"}onChange={() => setPostType("Article")}
          />
          Article
        </label>
      </div>

      <h2>What do you want to ask or share?</h2>

      <p className="post-description">
        {postType === "Question"
          ? "Ask a question and get help from the community."
          : "Share an article with the community."}
      </p>

      <form className="post-form" onSubmit={handlePost}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          placeholder={
            postType === "Question"
              ? "Start your question with how, what, why, etc."
              : "Enter a descriptive title"
          }
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />

        {postType === "Question" ? (
          <>
            <label htmlFor="description">Describe your problem</label>
            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe your problem"
              required
            />
          </>
        ) : (
          <>
            <label htmlFor="abstract">Abstract</label>
            <textarea
              id="abstract"
              value={abstract}
              onChange={(event) => setAbstract(event.target.value)}
              placeholder="Enter a short summary of your article"
              required
            />

            <label htmlFor="articleText">Article Text</label>
            <textarea
              id="articleText"
              value={articleText}
              onChange={(event) => setArticleText(event.target.value)}
              placeholder="Write your article here"
              required
            />
          </>
        )}

        <label htmlFor="tags">Tags</label>
        <input
          id="tags"
          type="text"
          value={tags}
          onChange={(event) => setTags(event.target.value)}
          placeholder="Enter up to 3 tags separated by commas"
          required
        />
        <button type="submit" className="post-button">
          Post
        </button>
      </form>
    </div>
  );
}

export default Post;