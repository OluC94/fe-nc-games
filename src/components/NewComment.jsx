import { useState } from "react";

const NewComment = () => {
  const [newComment, setNewComment] = useState("");
  const [commentInput, setCommentInput] = useState("");

  const handleCommentInput = (e) => {
    setCommentInput(e.target.value);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    setNewComment(commentInput);
    console.log(newComment);
    //creat util that adds the comment
  };

  return (
    <section>
      <form className="comment-form">
        <label htmlFor="new-comment"></label>
        <br />
        <textarea
          type="textarea"
          id="new-comment"
          name="newComment"
          placeholder="Add your comment..."
          value={commentInput}
          onChange={handleCommentInput}
          required
        ></textarea>
        <br />
        <button onClick={handleSubmitComment}>Submit Comment</button>
      </form>
    </section>
  );
};

export default NewComment;
