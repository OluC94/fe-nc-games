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
  const [commentSubmitted, setCommentSubmitted] = useState(false); // comment this out

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
    //set comments to [comments with idx=comment_id removed]
    // display comment deleted
    // call the functino that deletes the comment

    //notes for tomorrow
    // 1 - check how the state was used for optimistic new comment rendering
    // 2 -  decide on output message -> replace comment card in array or add msg above comment card

    const targetID = parseInt(e.target.value);
    setComments((currComments) => {
      console.log(
        currComments.map((comm) => {
          console.log(typeof comm.comment_id);
          console.log(typeof targetID);
          return comm;
        })
      );
      return currComments;
    });

    // deleteCommentByCommentID(e.target.value).then((response) => {
    //   console.log(response);
    // });
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
                  {comment.author !== username ? null : (
                    <button value={comment.comment_id} onClick={handleDelete}>
                      Delete Comment
                    </button>
                  )}
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
