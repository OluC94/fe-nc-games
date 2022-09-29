import { useState } from "react";
import { addReviewComment } from "../utils/api";
import Loading from "./Loading";

const NewComment = ({
  review,
  username,
  setCommentSubmitted,
  setCommCount,
  comments,
  setComments,
}) => {
  const [inputComment, setInputComment] = useState("");
  const [newComment, setNewComment] = useState({});
  const [commentFailed, setCommentFailed] = useState(false);
  const [noCommentAdded, setNoCommentAdded] = useState(false);

  const { review_id } = review;

  const handleCommentInput = (e) => {
    setInputComment(e.target.value);
  };

  const handleSubmitComment = (e) => {
    setCommentFailed(false);
    setCommentSubmitted(false);
    e.preventDefault();
    const reqObj = { username: username, body: inputComment };

    if (inputComment.length > 0) {
      setNoCommentAdded(false);

      setComments((currComments) => [
        ...comments,
        {
          body: inputComment,
          created_at: "Just added",
          votes: 0,
          comment_id: comments.length,
        },
      ]);
      setCommCount((currCommCount) => currCommCount + 1);

      addReviewComment(review_id, reqObj)
        .then(({ comment }) => {
          setNewComment(comment);
          setInputComment("");
          setCommentSubmitted(true);
        })
        .catch((err) => {
          setCommentFailed(true);
          setCommentSubmitted(true);
          setCommCount((currCommCount) => currCommCount - 1);
        });
    } else {
      setNoCommentAdded(true);
    }
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
          value={inputComment}
          onChange={handleCommentInput}
          required
        ></textarea>
        <br />
        <button onClick={handleSubmitComment}>Submit Comment</button>
        {commentFailed ? <span>Your comment failed to post</span> : null}
        {noCommentAdded ? <p>Cannot submit empty comment</p> : null}
      </form>
    </section>
  );
};

export default NewComment;
