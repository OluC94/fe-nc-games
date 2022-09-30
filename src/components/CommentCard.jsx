import { useEffect, useState } from "react";
import {
  dateFormat,
  deleteCommentByCommentID,
  fetchReviewComments,
} from "../utils/api";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";
import NewComment from "./NewComment";

const CommentCard = ({ review, username, setCommCount }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const commentDeletedStr =
    "Your comment has now been deleted, please refresh the page to see updates";

  const { review_id } = review;
  useEffect(() => {
    setIsLoading(true);
    fetchReviewComments(review_id)
      .then(({ comments }) => {
        setComments(comments);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  const handleDelete = (e) => {
    const targetID = parseInt(e.target.value);

    setComments((currComments) => {
      return currComments.map((comm) => {
        if (comm.comment_id !== targetID) {
          return comm;
        } else {
          return { ...comm, deleted: true };
        }
      });
    });
    setCommCount((currCommCount) => currCommCount - 1);

    deleteCommentByCommentID(e.target.value).catch((err) => {
      setCommCount((currCommCount) => currCommCount + 1);
      setComments((currComments) => {
        return currComments.map((comm) => {
          if (comm.comment_id !== targetID) {
            return comm;
          } else {
            return { ...comm, deleteFailed: true };
          }
        });
      });
    });
  };

  if (isLoading) return <Loading />;
  if (error) return <ErrorPage />;

  return (
    <section>
      {commentSubmitted ? <span>Your comment has been added</span> : null}
      <NewComment
        review={review}
        username={username}
        setCommentSubmitted={setCommentSubmitted}
        setCommCount={setCommCount}
        comments={comments}
        setComments={setComments}
      />
      <br />
      {comments.length === 0 ? (
        "No comments yet"
      ) : (
        <section>
          <h4>All comments</h4>
          <ul className="comment-list">
            {comments.map((comment) => {
              return (
                <li key={comment.comment_id} className="comment-card">
                  <p>Author: {comment.author}</p>
                  <p>{comment.body}</p>
                  <p>
                    {comment.votes === 1
                      ? comment.votes + " vote"
                      : comment.votes + " votes"}
                  </p>
                  <p>{dateFormat(comment.created_at)}</p>
                  {comment.deleted ? <p> {commentDeletedStr} </p> : null}
                  {comment.deleteFailed ? (
                    <p> Oops, something went wrong </p>
                  ) : null}
                  {comment.author === username && !comment.deleted ? (
                    <button value={comment.comment_id} onClick={handleDelete}>
                      Delete Comment
                    </button>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </section>
  );
};

export default CommentCard;
