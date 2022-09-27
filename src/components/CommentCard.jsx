import { useEffect, useState } from "react";
import { dateFormat, fetchReviewComments } from "../utils/api";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";

const CommentCard = ({ review }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

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

  if (isLoading) return <Loading />;
  if (error) return <ErrorPage />;

  return (
    <section>
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
